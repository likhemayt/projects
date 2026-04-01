/**
 * POST /api/booking against a running server (Vercel dev or production URL).
 *
 *   TEST_API_BASE=http://127.0.0.1:3000 npm run test:booking-api
 *   TEST_API_BASE=https://your-app.vercel.app npm run test:booking-api
 */
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const base = (process.env.TEST_API_BASE || "http://127.0.0.1:3000").replace(/\/$/, "");

const payload = {
  checkIn: "2099-06-01",
  checkOut: "2099-06-05",
  guests: "2",
  email: "test@example.com",
};

const url = `${base}/api/booking`;
console.log("POST", url);

const r = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const text = await r.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("Non-JSON response:", text.slice(0, 500));
  process.exit(1);
}

if (!r.ok) {
  console.error("HTTP", r.status, data);
  process.exit(1);
}

console.log("Booking API OK:", JSON.stringify(data, null, 2));
