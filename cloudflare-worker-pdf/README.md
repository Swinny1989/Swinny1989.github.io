# Katie's K9s — Onboarding Worker

Cloudflare Worker behind the onboarding form. It does two jobs, chosen by the
request `Content-Type`:

1. **Registration** (`application/json`): emails Katie via **Resend** with the
   full record attached as a `.json` file, then logs it to Excel via **Make.com**.
2. **Vet-authorisation PDF** (`multipart/form-data`): stores it in an **R2** bucket.

API keys and the Make webhook live only in the worker. They never reach the browser.

## What it does

### Registration (`application/json`)

The body is the flat registration record (the same keys that go to Excel).

1. Validates it (must have Owner 1 first name, surname, email, and Dog Name; max ~200 KB).
2. Emails `EMAIL_TO` through Resend:
   - Subject: `New registration: <dog> - <owner>`
   - Short plain-text summary (owner, email, mobile, dog, PDF stored yes/no)
   - Attachment: `registration-<surname>-<firstname>-<dog>-<date>.json` (the full record)
   - `Reply-To` is the customer's email, but only when it looks valid
3. **Only if the email was sent**, forwards the record to `MAKE_WEBHOOK_URL`
   (Excel). Make failures never block the customer; the email already has everything.

Responses:

| Status | Meaning |
| ------ | ------- |
| `200` `{ ok, emailSent: true, sheetLogged }` | Email sent. `sheetLogged` says whether Make accepted it. |
| `400` | Invalid or incomplete record. |
| `403` | `Origin` header missing or not `ALLOWED_ORIGIN`. |
| `413` | Payload too large. |
| `502` | Resend rejected or was unreachable. Make was **not** called, so a retry can't create a duplicate Excel row. |
| `503` | Email not configured (missing `RESEND_API_KEY` / `EMAIL_TO` / `EMAIL_FROM`). |

The email is sent with an `Idempotency-Key` derived from its content, so a retry
of the same submission cannot send the email twice.

### PDF upload (`multipart/form-data`)

Fields: `file` (PDF, max 10 MB), `ownerFirstName`, `ownerSurname`, `dog`.
Stored at `vet-auth/<surname>-<firstname>/<dog>/<timestamp>-<filename>.pdf`
(segments slugified; empty values become `unknown-owner` / `unknown-dog`).
Returns `{ ok: true, key }`.

## Logging

Observability is enabled in `wrangler.toml`, giving free searchable logs in the
Cloudflare dashboard (~3 day retention). The worker logs **outcomes only**
(for example `email_failed reason=resend_403_validation_error`). It never logs
submission contents, Resend's error messages, or the webhook URL. Live stream:

```bash
wrangler tail
```

## One-time setup

Requires the Wrangler CLI and a Cloudflare account.

```bash
npm install -g wrangler        # or: npm i -D wrangler
wrangler login
cd cloudflare-worker-pdf
```

### 1. Create the R2 bucket

```bash
wrangler r2 bucket create katiesk9s-vet-auth
```

The name must match `bucket_name` in `wrangler.toml`.

### 2. Set up Resend (email)

1. Create an account at <https://resend.com>.
2. **Domains → Add Domain** → `notifications.katiesk9s.co.uk`. Add the
   **subdomain**, not the root domain: Resend recommends sending from a subdomain to
   keep its sending reputation separate and leave the root domain's DNS untouched.
   Then add the DNS records Resend shows (an MX and a TXT for SPF, and a TXT for
   DKIM) and click **Verify**.
   - **GoDaddy:** try Resend's **Auto Configure** button first (it uses GoDaddy's
     Domain Connect). To add them by hand: GoDaddy → DNS → Add New Record. GoDaddy
     appends the domain itself, so enter only the part before `.katiesk9s.co.uk`
     (for example `send.notifications`, not the full hostname). The MX record needs
     Priority `10`. Copy the values exactly as Resend shows them.
   - Optionally add a DMARC record if prompted; it helps Hotmail/Outlook trust the mail.
3. **API Keys → Create API Key** with **Sending access**, restricted to that domain.
4. Store it as a secret (paste when prompted; never commit it):

   ```bash
   wrangler secret put RESEND_API_KEY
   ```

`EMAIL_TO` and `EMAIL_FROM` are plain vars in `wrangler.toml`. The sender must be
on the verified domain (default `registrations@notifications.katiesk9s.co.uk`).

> **Testing before the domain is verified:** Resend's shared test sender
> (`onboarding@resend.dev`) can only deliver to the email address your Resend
> account was created with. To test early, temporarily set
> `EMAIL_FROM = "Katie's K9s <onboarding@resend.dev>"` and `EMAIL_TO` to that
> address, deploy, then switch back once the domain is verified.
>
> The first emails to a Hotmail address can land in Junk. Mark one as "Not junk".

### 3. Set the Make webhook secret

```bash
wrangler secret put MAKE_WEBHOOK_URL
```

If unset, the worker still emails Katie; it just skips Excel and returns `sheetLogged: false`.

### 4. Deploy the worker

```bash
wrangler deploy
```

> **Deploy order matters.** Deploy and test the worker **before** pushing the
> website. The site now treats a successful email as the only success, so a site
> pointing at a worker without Resend configured would show every customer an error.

### 5. Test it

This sends a real email to `EMAIL_TO` and adds a mostly empty row to the Excel sheet:

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST "https://katiesk9s-vet-auth.tom-ec0.workers.dev" \
  -H "Content-Type: application/json" \
  -H "Origin: https://katiesk9s.co.uk" \
  -d '{"Owner 1 First Name":"Test","Owner 1 Surname":"Person","Owner 1 Email":"test@example.com","Dog Name":"Rex"}'
```

Expect `{"ok":true,"emailSent":true,"sheetLogged":true}` and an email with the JSON attached.

### 6. The website

The site posts to this worker. The URL defaults to
`https://katiesk9s-vet-auth.tom-ec0.workers.dev` and can be overridden at build
time with `NEXT_PUBLIC_PDF_WORKER_URL` (see `.github/workflows/deploy.yml`).
Submitting from `localhost` is rejected by the origin check by design.

## Configuration

| Setting            | Where           | Purpose |
| ------------------ | --------------- | ------- |
| `ALLOWED_ORIGIN`   | `wrangler.toml` | The only browser origin allowed to POST. |
| `EMAIL_TO`         | `wrangler.toml` | Where registration emails are delivered. |
| `EMAIL_FROM`       | `wrangler.toml` | Sender; must be on a Resend-verified domain. |
| `RESEND_API_KEY`   | secret          | Resend API key. |
| `MAKE_WEBHOOK_URL` | secret          | Make.com webhook for Excel logging. |
| `bucket_name`      | `wrangler.toml` | R2 bucket for PDFs. |

## Limits

Resend free plan: **100 emails/day, 3,000/month** (one email per registration).
Workers free plan: 100,000 requests/day. R2: 10 GB storage free.

## Troubleshooting

Check **Workers → katiesk9s-vet-auth → Logs** (or `wrangler tail`):

| Log line | Likely cause |
| -------- | ------------ |
| `email_failed reason=not_configured` | `RESEND_API_KEY` secret not set (or `EMAIL_TO`/`EMAIL_FROM` missing). |
| `reason=resend_401_*` | API key wrong or revoked. |
| `reason=resend_403_*` | Sender domain not verified, or sending from `resend.dev` to an address that isn't the account owner's. |
| `reason=resend_422_*` | Resend rejected the request (check `EMAIL_FROM` format). |
| `reason=resend_429_*` | Daily/monthly quota or rate limit reached. |
| `reason=resend_unreachable_*` | Network problem reaching Resend. |

## Retrieving stored PDFs

```bash
# list
wrangler r2 object list katiesk9s-vet-auth --prefix vet-auth/

# download one
wrangler r2 object get katiesk9s-vet-auth vet-auth/tester-dev/rex/1699999999999-vet-auth-2026-10-13-rex-dev-tester.pdf --file ./rex.pdf
```

Objects also carry `owner`, `dog` and `uploadedAt` custom metadata.

## Security notes

- Every POST must carry an `Origin` header equal to `ALLOWED_ORIGIN`. Browsers always
  send it; scripts must set it. This stops casual abuse but is **not
  authentication**, because `Origin` can be spoofed outside a browser.
- Because the endpoint now sends email, someone who finds the worker URL and spoofs
  the origin could send junk registrations and use up the free 100/day Resend
  quota. If that ever happens, add Cloudflare Turnstile or rate limiting.
- Customer text is only ever placed in a plain-text email body and a JSON attachment;
  it is never rendered as HTML, and control characters are stripped from the subject.
