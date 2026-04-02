/**
 * GET /api/leads (requires ADMIN_SECRET)
 *
 *   TEST_API_BASE=http://127.0.0.1:3000 npm run test:leads
 */
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const base = (process.env.TEST_API_BASE || "http://127.0.0.1:3000").replace(/\/$/, "");
const secret = process.env.ADMIN_SECRET?.trim();

if (!secret) {
  console.error("Set ADMIN_SECRET in .env.local (same value as Vercel).");
  process.exit(1);
}

const url = `${base}/api/leads`;
console.log("GET", url);

const r = await fetch(url, {
  headers: { Authorization: `Bearer ${secret}` },
});

const text = await r.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("Non-JSON:", text.slice(0, 400));
  process.exit(1);
}

if (!r.ok) {
  console.error("HTTP", r.status, data);
  process.exit(1);
}

console.log("OK. Lead count:", data.leads?.length ?? 0);
console.log(JSON.stringify(data, null, 2));
