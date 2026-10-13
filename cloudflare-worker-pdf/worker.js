/**
 * Katie's K9s — Vet Authorisation PDF storage worker
 *
 * Accepts a multipart/form-data POST from the onboarding form, validates the
 * upload, and stores the PDF in an R2 bucket.
 *
 * Expected form fields:
 *   file   (required) — the PDF blob
 *   owner  (optional) — owner name, stored as object metadata
 *   dog    (optional) — dog name, stored as object metadata
 *
 * Bindings (see wrangler.toml):
 *   R2_BUCKET      — R2 bucket binding
 *   ALLOWED_ORIGIN — e.g. "https://katiesk9s.co.uk" (var, not secret)
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

    // ── Parse multipart body ──────────────────────────────────────────────────
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

    // ── Validate ───────────────────────────────────────────────────────────────
    if (file.type && file.type !== "application/pdf") {
      return json({ error: "File must be a PDF" }, 415, cors);
    }
    if (file.size > MAX_BYTES) {
      return json({ error: "File too large" }, 413, cors);
    }

    const owner = (form.get("owner") || "").toString().slice(0, 200);
    const dog = (form.get("dog") || "").toString().slice(0, 200);

    // ── Build a safe object key ────────────────────────────────────────────────
    const providedName = (file.name || "vet-auth.pdf").toString();
    const safeName = providedName
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 160);
    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
    const key = `vet-auth/${yyyy}/${mm}/${Date.now()}-${safeName}`;

    // ── Store in R2 ──────────────────────────────────────────────────────────────
    try {
      await env.R2_BUCKET.put(key, file.stream(), {
        httpMetadata: { contentType: "application/pdf" },
        customMetadata: {
          owner,
          dog,
          uploadedAt: now.toISOString(),
        },
      });
    } catch (err) {
      return json({ error: "Storage failed", detail: String(err) }, 502, cors);
    }

    return json({ ok: true, key }, 200, cors);
  },
};
