# Testing booking leads (Supabase + API)

## Prerequisites

1. **Supabase**: Run `supabase/schema.sql` in **SQL Editor** (including the `booking_requests_created_at_idx` index).
2. **Environment variables** (local `.env.local` and Vercel project):
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL` (optional duplicate of project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (server only)
   - `ADMIN_SECRET` (long random string; used by `/api/leads` and the Staff panel)

## Step-by-step tests

### 1. Confirm database and service role

```bash
cd exploration-resort
npm install
```

Expect: anon auth OK; if `SUPABASE_SERVICE_ROLE_KEY` is set, a test insert/delete on `booking_requests` succeeds.

### 2. Run API locally (Vercel dev)

Terminal A:

```bash
vercel dev
```

Leave it on (often `http://127.0.0.1:3000`). Ensure `.env.local` is loaded by Vercel or export vars.

### 3. Create a lead (POST booking)

Terminal B:

```bash
npm run test:booking-api
```

Or submit the **Plan your stay** form in the app (with `vite` + proxy, or open the site served by `vercel dev`).

### 4. Fetch all leads (GET)

With `vercel dev` still running and `ADMIN_SECRET` in `.env.local`:

```bash
npm run test:leads
```

Optional:

```bash
TEST_API_BASE=https://your-deployment.vercel.app npm run test:leads
```

Expect: HTTP 200 and a `leads` array with rows ordered by `created_at` descending.

### 5. Staff UI on the site

1. Deploy or run `vercel dev` and open the app.
2. Scroll to **Booking leads** (or use the **Staff leads** link in the footer).
3. Paste the same `ADMIN_SECRET` as in Vercel, click **Fetch all leads**.
4. You should see every row from `booking_requests`.

### 6. Production (Vercel)

Add `ADMIN_SECRET` in **Project → Settings → Environment Variables** (Production + Preview). Redeploy. Repeat steps 3–5 against the production URL.

## Troubleshooting

| Symptom | Check |
|--------|--------|
| `503` missing Supabase | `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` on server |
| `503` ADMIN_SECRET | Set `ADMIN_SECRET` in Vercel |
| `401 Unauthorized` | Staff key must match `ADMIN_SECRET` exactly |
| `500` on GET | Table missing: run `schema.sql`; check Supabase logs |
| Empty list | No rows yet; run `test:booking-api` or submit the form |
