# Katie's K9s — Vet Authorisation PDF Worker

Cloudflare Worker that receives the vet-authorisation PDF from the onboarding
form and stores it in an R2 bucket. The PDF is a convenience archive — the
FormSubmit email remains the source of truth, so a failure here never blocks a
submission.

## What it does

- Accepts `POST` `multipart/form-data` with fields:
  - `file` — the PDF (required, max 10 MB, must be `application/pdf`)
  - `owner` — owner name (stored as object metadata)
  - `dog` — dog name (stored as object metadata)
- Handles the browser CORS preflight (`OPTIONS`).
- Stores the object at `vet-auth/<year>/<month>/<timestamp>-<filename>.pdf`.
- Returns `{ ok: true, key }` on success.

## One-time setup

Requires the Wrangler CLI and a Cloudflare account.

```bash
npm install -g wrangler        # or: npm i -D wrangler
wrangler login
```

### 1. Create the R2 bucket

```bash
wrangler r2 bucket create katiesk9s-vet-auth
```

The bucket name must match `bucket_name` in `wrangler.toml`.

### 2. Deploy the worker

```bash
cd cloudflare-worker-pdf
wrangler deploy
```

Wrangler prints the deployed URL, e.g.:

```
https://katiesk9s-vet-auth.<your-subdomain>.workers.dev
```

### 3. Point the site at the worker

Set the environment variable used by the Next.js build:

```
NEXT_PUBLIC_PDF_WORKER_URL=https://katiesk9s-vet-auth.<your-subdomain>.workers.dev
```

- **Local dev:** add it to `nextjs-site/.env.local`
- **GitHub Actions (deploy):** add it as a repository variable/secret and expose
  it to the build step in `.github/workflows/deploy.yml`, e.g.:

  ```yaml
  env:
    NEXT_PUBLIC_PDF_WORKER_URL: ${{ vars.NEXT_PUBLIC_PDF_WORKER_URL }}
  ```

Because the var is read at build time and inlined into the static export, you
must rebuild/redeploy the site after setting it.

> If `NEXT_PUBLIC_PDF_WORKER_URL` is unset, the form skips the upload entirely
> and simply records `PDF stored: No` in the email. Nothing breaks.

## Configuration

| Setting          | Where            | Purpose                                            |
| ---------------- | ---------------- | -------------------------------------------------- |
| `ALLOWED_ORIGIN` | `wrangler.toml`  | Only this browser origin may POST. Defaults to the live site. |
| `bucket_name`    | `wrangler.toml`  | R2 bucket the PDFs are written to.                 |

For local worker testing against a staging site, temporarily change
`ALLOWED_ORIGIN` (e.g. `http://localhost:3000`) and redeploy, or run
`wrangler dev`.

## Retrieving stored PDFs

```bash
# list
wrangler r2 object list katiesk9s-vet-auth --prefix vet-auth/

# download one
wrangler r2 object get katiesk9s-vet-auth vet-auth/2026/10/1699999999999-vet-auth-2026-10-13-rex-dev-tester.pdf --file ./rex.pdf
```

Objects also carry `owner`, `dog` and `uploadedAt` custom metadata.

## Security notes

- The worker only reflects the configured `ALLOWED_ORIGIN` in CORS headers and
  rejects mismatched origins for non-browser clients too.
- There is no auth on the endpoint beyond origin checking — it only accepts PDFs
  up to 10 MB and writes to a private bucket. If you later need stronger
  guarantees (e.g. to stop someone POSTing junk PDFs with a spoofed Origin via a
  non-browser client), add a shared secret header checked by the worker.
