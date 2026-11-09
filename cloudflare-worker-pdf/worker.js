/**
 * Katie's K9s — onboarding submission worker
 *
 * Two responsibilities, selected by request Content-Type:
 *
 *   1. multipart/form-data  → stores the vet-authorisation PDF in R2
 *   2. application/json      → the registration submission:
 *        a) emails Katie via Resend, with the full record attached as a .json file
 *        b) then forwards the record to the Make.com webhook (Excel logging)
 *
 * The email is the primary record. If it fails the worker returns an error and
 * does NOT call Make, so a customer retry cannot create a duplicate sheet row.
 * Make failures are non-blocking (the email already has everything).
 *
 * Secrets and keys never reach the browser: they live only in this worker.
 *
 * Bindings / vars (see wrangler.toml):
 *   R2_BUCKET        — R2 bucket binding
 *   ALLOWED_ORIGIN   — e.g. "https://katiesk9s.co.uk" (var)
 *   EMAIL_TO         — where notifications go, e.g. katies-k9s@hotmail.com (var)
 *   EMAIL_FROM       — verified Resend sender, e.g. "Katie's K9s <registrations@katiesk9s.co.uk>" (var)
 *   RESEND_API_KEY   — Resend API key (secret: `wrangler secret put RESEND_API_KEY`)
 *   MAKE_WEBHOOK_URL — Make.com webhook URL (secret: `wrangler secret put MAKE_WEBHOOK_URL`)
 *
 * Logging is outcome-only (status codes / reasons). Never log record contents.
 */

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB cap for the PDF
const MAX_JSON_CHARS = 200_000; // generous cap for the registration record
const UPSTREAM_TIMEOUT_MS = 10_000;

// A submission without these is junk, not a registration.
const REQUIRED_FIELDS = [
  "Owner 1 First Name",
  "Owner 1 Surname",
  "Owner 1 Email",
  "Dog Name",
];

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

    // The JSON route now sends email, so require the Origin header to match.
    // Browsers always send Origin on cross-origin POSTs; a request with no Origin
    // is a script (curl etc.). This is a speed bump, not authentication: Origin
    // can be spoofed outside a browser.
    if (allowed !== "*" && origin !== allowed) {
      return json({ error: "Forbidden origin" }, 403, cors);
    }

    const contentType = request.headers.get("Content-Type") || "";

    // ── Route 2: JSON → email Katie + log to Make ────────────────────────────
    if (contentType.includes("application/json")) {
      return handleSubmission(request, env, cors);
    }

    // ── Route 1: multipart → store PDF in R2 ─────────────────────────────────
    return handlePdfUpload(request, env, cors);
  },
};

// ── helpers ─────────────────────────────────────────────────────────────────────

// Single-line, control-character-free, length-limited text (safe for subjects/headers).
function clean(value, max = 200) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
}

function slug(s, fallback) {
  const out = String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return out || fallback;
}

// UTF-8 safe base64 (handles smart quotes, emoji etc. in customer text).
function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

async function sha256Hex(str) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// ── Registration submission ─────────────────────────────────────────────────────
async function handleSubmission(request, env, cors) {
  let raw;
  try {
    raw = await request.text();
  } catch {
    return json({ error: "Invalid body" }, 400, cors);
  }
  if (raw.length > MAX_JSON_CHARS) {
    return json({ error: "Payload too large" }, 413, cors);
  }

  let record;
  try {
    record = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid JSON" }, 400, cors);
  }
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return json({ error: "Invalid record" }, 400, cors);
  }
  for (const key of REQUIRED_FIELDS) {
    if (typeof record[key] !== "string" || !record[key].trim()) {
      return json({ error: "Missing required fields" }, 400, cors);
    }
  }

  // 1. Email — the primary record. Fail loudly so the customer can retry.
  const email = await sendNotificationEmail(record, env);
  if (!email.ok) {
    console.log(`email_failed reason=${email.reason}`);
    const status = email.reason === "not_configured" ? 503 : 502;
    return json({ error: "Email failed" }, status, cors);
  }
  console.log("email_sent ok=true");

  // 2. Excel logging via Make — best effort, never blocks the customer.
  const sheetLogged = await forwardToMake(record, env);

  return json({ ok: true, emailSent: true, sheetLogged }, 200, cors);
}

// ── Email Katie via Resend ──────────────────────────────────────────────────────
async function sendNotificationEmail(record, env) {
  if (!env.RESEND_API_KEY || !env.EMAIL_TO || !env.EMAIL_FROM) {
    return { ok: false, reason: "not_configured" };
  }

  const owner = clean(`${record["Owner 1 First Name"]} ${record["Owner 1 Surname"]}`, 100);
  const dog = clean(record["Dog Name"], 80);
  const breed = clean(record["Dog Breed"], 80);
  const ownerEmail = clean(record["Owner 1 Email"], 254);
  const mobile = clean(record["Owner 1 Mobile"], 40);

  const subject = clean(`New registration: ${dog || "dog"} - ${owner || "owner"}`, 150);

  // Plain text only: customer-provided values are never interpreted as HTML.
  const text = [
    "A customer has completed the registration form on the Katie's K9s website.",
    "",
    `Owner:     ${owner}`,
    `Email:     ${ownerEmail}`,
    `Mobile:    ${mobile}`,
    `Dog:       ${dog}${breed ? ` (${breed})` : ""}`,
    `Submitted: ${clean(record["Submission Timestamp"], 40)}`,
    `Vet authorisation PDF stored: ${clean(record["PDF stored"], 10) || "Unknown"}`,
    "",
    "The full registration is attached as a JSON file.",
  ].join("\n");

  const date = new Date().toISOString().slice(0, 10);
  const filename = `registration-${slug(`${record["Owner 1 Surname"]}-${record["Owner 1 First Name"]}`, "owner")}-${slug(dog, "dog")}-${date}.json`;

  const payload = {
    from: env.EMAIL_FROM,
    to: [env.EMAIL_TO],
    subject,
    text,
    attachments: [
      { filename, content: toBase64(JSON.stringify(record, null, 2)) },
    ],
  };
  // A malformed reply_to would make Resend reject the whole email, so only set it
  // when the customer's address looks valid.
  if (EMAIL_RE.test(ownerEmail)) {
    payload.reply_to = [ownerEmail];
  }

  const body = JSON.stringify(payload);
  // Same content => same key, so a retry of the same submission cannot send the
  // email twice (Resend returns the original response for a duplicate key).
  const idempotencyKey = `reg-${await sha256Hex(body)}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!res.ok) {
      // Log only the status and Resend's error type, never its message (it can echo input).
      let type = "unknown";
      try {
        type = clean((await res.json()).name, 60) || "unknown";
      } catch {}
      return { ok: false, reason: `resend_${res.status}_${type}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `resend_unreachable_${clean(err?.name, 40)}` };
  }
}

// ── Forward the record to the Make webhook ──────────────────────────────────────
async function forwardToMake(record, env) {
  if (!env.MAKE_WEBHOOK_URL) {
    console.log("make_forward skipped: MAKE_WEBHOOK_URL not set");
    return false;
  }
  try {
    const res = await fetch(env.MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    console.log(`make_forward status=${res.status} ok=${res.ok}`);
    return res.ok;
  } catch (err) {
    // err.name only: the message could contain the (secret) webhook URL.
    console.log(`make_forward error=${clean(err?.name, 40)}`);
    return false;
  }
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
    console.log(`pdf_store_error=${clean(err?.name, 40)}`);
    return json({ error: "Storage failed" }, 502, cors);
  }

  return json({ ok: true, key }, 200, cors);
}
