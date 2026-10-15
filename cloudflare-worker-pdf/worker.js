/**
 * Katie's K9s — onboarding submission worker
 *
 * Two responsibilities, selected by request Content-Type:
 *
 *   1. multipart/form-data  → stores the vet-authorisation PDF in R2
 *   2. application/json      → forwards the submission record to the Make.com
 *                              webhook (which logs it to the OneDrive Excel sheet)
 *
 * Routing the Make webhook through the worker keeps the webhook URL out of the
 * public client bundle and reuses the origin allow-list below.
 *
 * Bindings / vars (see wrangler.toml):
 *   R2_BUCKET        — R2 bucket binding
 *   ALLOWED_ORIGIN   — e.g. "https://katiesk9s.co.uk" (var, not secret)
 *   MAKE_WEBHOOK_URL — the Make.com webhook URL (secret: `wrangler secret put`)
 */

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB cap

function corsHeaders(origin, allowed) {
  // Only reflect the origin if it matches the configured allow-list value.
  const allowOrigin = origin && origin === allowed ? origin : allowed;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "*";
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, allowed);

    // ── CORS preflight ──────────────────────────────────────────────────────
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    // Reject cross-origin posts that don't match the allow-list (defence in depth;
    // CORS already blocks browsers, this stops non-browser clients too).
    if (allowed !== "*" && origin && origin !== allowed) {
      return json({ error: "Forbidden origin" }, 403, cors);
    }

    const contentType = request.headers.get("Content-Type") || "";

    // ── Route 2: JSON → forward to Make (Excel logging) ──────────────────────
    if (contentType.includes("application/json")) {
      return handleMakeForward(request, env, cors);
    }

    // ── Route 1: multipart → store PDF in R2 ─────────────────────────────────
    return handlePdfUpload(request, env, cors);
  },
};

// ── Forward the submission record to the Make webhook ───────────────────────────
async function handleMakeForward(request, env, cors) {
  const webhook = env.MAKE_WEBHOOK_URL;
  if (!webhook) {
    console.log("make_forward skipped: MAKE_WEBHOOK_URL not set");
    return json({ error: "Logging not configured" }, 503, cors);
  }

  let record;
  try {
    record = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, cors);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    // PII-safe log: outcome only, never the record body.
    console.log(`make_forward status=${res.status} ok=${res.ok}`);
    if (!res.ok) {
      return json({ error: "Make rejected the record", status: res.status }, 502, cors);
    }
  } catch (err) {
    console.log(`make_forward error=${String(err)}`);
    return json({ error: "Make forward failed" }, 502, cors);
  }

  return json({ ok: true }, 200, cors);
}

// ── Store the vet-auth PDF in R2 ────────────────────────────────────────────────
async function handlePdfUpload(request, env, cors) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form data" }, 400, cors);
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return json({ error: "Missing file" }, 400, cors);
  }

  // ── Validate ──────────────────────────────────────────────────────────────
  if (file.type && file.type !== "application/pdf") {
    return json({ error: "File must be a PDF" }, 415, cors);
  }
  if (file.size > MAX_BYTES) {
    return json({ error: "File too large" }, 413, cors);
  }

  const firstName = (form.get("ownerFirstName") || "").toString().slice(0, 100);
  const surname = (form.get("ownerSurname") || "").toString().slice(0, 100);
  const dog = (form.get("dog") || "").toString().slice(0, 200);
  const owner = `${firstName} ${surname}`.trim();

  // ── Build a safe object key ─────────────────────────────────────────────────
  // Path layout: vet-auth/<surname>-<firstname>/<dog>/<timestamp>-<file>.pdf
  const slug = (s, fallback) => {
    const out = s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return out || fallback;
  };

  const ownerSeg = slug(`${surname}-${firstName}`, "unknown-owner");
  const dogSeg = slug(dog, "unknown-dog");

  const providedName = (file.name || "vet-auth.pdf").toString();
  const safeName = providedName
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 160);

  const now = new Date();
  const key = `vet-auth/${ownerSeg}/${dogSeg}/${Date.now()}-${safeName}`;

  // ── Store in R2 ─────────────────────────────────────────────────────────────
  try {
    await env.R2_BUCKET.put(key, file.stream(), {
      httpMetadata: { contentType: "application/pdf" },
      customMetadata: {
        owner,
        dog,
        uploadedAt: now.toISOString(),
      },
    });
    // PII-safe log: outcome only (the key embeds names, so don't log it).
    console.log("pdf_stored ok=true");
  } catch (err) {
    console.log(`pdf_store_error=${String(err)}`);
    return json({ error: "Storage failed", detail: String(err) }, 502, cors);
  }

  return json({ ok: true, key }, 200, cors);
}
