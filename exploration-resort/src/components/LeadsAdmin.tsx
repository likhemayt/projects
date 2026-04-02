import { useCallback, useState } from "react";

export type BookingLead = {
  id: string;
  created_at: string;
  check_in: string;
  check_out: string;
  guests: number;
  email: string;
};

const STORAGE_KEY = "exploration_admin_key";

export function LeadsAdmin() {
  const [adminKey, setAdminKey] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) ?? "" : ""
  );
  const [leads, setLeads] = useState<BookingLead[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    if (!adminKey.trim()) {
      setError("Enter your staff key.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      sessionStorage.setItem(STORAGE_KEY, adminKey.trim());
      const r = await fetch("/api/leads", {
        headers: {
          Authorization: `Bearer ${adminKey.trim()}`,
        },
      });
      const body = (await r.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
        leads?: BookingLead[];
      };
      if (!r.ok) {
        setLeads(null);
        setError(body.error ?? `Request failed (${r.status})`);
        return;
      }
      setLeads(body.leads ?? []);
    } catch {
      setLeads(null);
      setError("Network error. Is the API running (e.g. vercel dev)?");
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  return (
    <section
      id="leads"
      className="scroll-mt-28 border-t border-ocean/15 bg-ocean-deep/30 px-5 py-16 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ocean/60">
          Staff
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
          Booking leads
        </h2>
        <p className="mt-2 max-w-xl font-sans text-sm text-ocean/70">
          Load all reservation requests from the database. Use the same{" "}
          <code className="rounded bg-ocean/10 px-1 py-0.5 text-xs">ADMIN_SECRET</code>{" "}
          configured on Vercel.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
              Staff key
            </span>
            <input
              type="password"
              autoComplete="off"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 focus:ring-2"
              placeholder="ADMIN_SECRET value"
            />
          </label>
          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="rounded-full bg-ocean px-8 py-3 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-sand transition hover:bg-ocean-deep disabled:opacity-50"
          >
            {loading ? "Loading…" : "Fetch all leads"}
          </button>
        </div>

        {error && (
          <p className="mt-4 font-sans text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {leads && leads.length === 0 && !loading && !error && (
          <p className="mt-8 font-sans text-sm text-ocean/65">No leads yet.</p>
        )}

        {leads && leads.length > 0 && (
          <div className="mt-8 overflow-x-auto rounded-xl border border-ocean/15 bg-white/90 shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm text-ocean">
              <thead>
                <tr className="border-b border-ocean/15 bg-sand/80 font-sans text-xs font-semibold uppercase tracking-wider text-ocean/60">
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Check-out</th>
                  <th className="px-4 py-3">Guests</th>
                  <th className="px-4 py-3 font-mono text-[11px]">ID</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-ocean/10 last:border-0 hover:bg-sand/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-ocean/85">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="whitespace-nowrap px-4 py-3">{row.check_in}</td>
                    <td className="whitespace-nowrap px-4 py-3">{row.check_out}</td>
                    <td className="px-4 py-3">{row.guests}</td>
                    <td className="max-w-[120px] truncate px-4 py-3 font-mono text-xs text-ocean/70">
                      {row.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
