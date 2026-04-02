import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

function json(res: VercelResponse, status: number, body: Record<string, unknown>) {
  res.status(status).json(body);
}

function getAdminToken(req: VercelRequest): string {
  const auth = req.headers.authorization?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const header =
    (req.headers["x-admin-secret"] as string | undefined)?.trim() ??
    (req.headers["X-Admin-Secret"] as string | undefined)?.trim() ??
    "";
  return auth || header;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  const expected = process.env.ADMIN_SECRET?.trim();
  if (!expected) {
    json(res, 503, {
      error: "Server missing ADMIN_SECRET. Set it in Vercel env to enable leads API.",
    });
    return;
  }

  const token = getAdminToken(req);
  if (token !== expected) {
    json(res, 401, { error: "Unauthorized" });
    return;
  }

  const url = process.env.SUPABASE_URL?.trim() || process.env.VITE_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    json(res, 503, {
      error: "Server is missing Supabase configuration (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).",
    });
    return;
  }

  const admin = createClient(url, serviceKey);

  const { data, error } = await admin
    .schema("public")
    .from("booking_requests")
    .select("id, created_at, check_in, check_out, guests, email")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("booking_requests select:", error);
    const e = error as any;
    json(res, 500, {
      error: "Could not load leads.",
      detail: e?.message,
      code: e?.code,
      status: e?.status,
      details: e?.details,
      hint: e?.hint,
    });
    return;
  }

  json(res, 200, { leads: data ?? [] });
}
