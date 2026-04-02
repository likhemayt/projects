import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPin,
  Package,
  Search,
  Truck,
  CircleDot,
} from "lucide-react";

/* ——— Types ——— */
type TimelinePhase = "ordered" | "shipped" | "out" | "arrived";

type ShipmentRow = {
  id: string;
  route: string;
  phase: TimelinePhase;
  eta: string;
};

/* ——— Helpers ——— */
function phaseFromTracking(id: string): TimelinePhase {
  const s = id.trim().toUpperCase();
  if (!s) return "ordered";
  const n = s.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
  return (["ordered", "shipped", "out", "arrived"] as const)[n];
}

function phaseIndex(p: TimelinePhase): number {
  return { ordered: 0, shipped: 1, out: 2, arrived: 3 }[p];
}

function formatPrice(weight: number, dest: number): number {
  return Math.round(12 + weight * 2.4 + dest * 18 + (weight * dest) / 80);
}

/* ——— Hero ——— */
function TrackingHero({
  value,
  onChange,
  onSearch,
  active,
  onFocus,
  onBlur,
}: {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 md:py-14">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-sky-400/80">
        Global Logistics
      </p>
      <h1 className="text-center font-sans text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Track anywhere, in real time
      </h1>
      <div
        className={`relative w-full max-w-xl rounded-2xl border p-1 transition-all duration-500 md:max-w-2xl ${
          active
            ? "border-sky-400/60 bg-sky-500/10 shadow-glow"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="flex items-center gap-2 rounded-xl bg-midnight/40 px-3 py-2 backdrop-blur-md md:px-4 md:py-3">
          <Search
            className={`h-5 w-5 shrink-0 transition-colors ${active ? "text-sky-300" : "text-slate-500"}`}
            aria-hidden
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Enter tracking ID (e.g. GL-8K2M9Q)"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none md:text-base"
            aria-label="Tracking number"
          />
          <button
            type="button"
            onClick={onSearch}
            className="shrink-0 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-midnight transition hover:bg-sky-400 md:text-sm"
          >
            Track
          </button>
        </div>
        {active && (
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-sky-500/20 via-cyan-400/10 to-sky-500/20 blur-xl"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

/* ——— Timeline ——— */
const TIMELINE_LABELS: { key: TimelinePhase; title: string; sub: string }[] = [
  { key: "ordered", title: "Ordered", sub: "Fulfillment confirmed" },
  { key: "shipped", title: "Shipped", sub: "Departed origin hub" },
  { key: "out", title: "Out for delivery", sub: "On final mile route" },
  { key: "arrived", title: "Arrived", sub: "Delivered to recipient" },
];

function SmartTimeline({ phase }: { phase: TimelinePhase }) {
  const idx = phaseIndex(phase);

  return (
    <div className="relative pl-2">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-500/50 via-white/20 to-white/5" />
      <ul key={phase} className="space-y-6">
        {TIMELINE_LABELS.map((step, i) => {
          const done = i <= idx;
          return (
            <motion.li
              key={step.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-4"
            >
              <motion.div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                  done
                    ? "border-sky-400 bg-sky-500/30 text-sky-200"
                    : "border-white/15 bg-white/5 text-slate-500"
                }`}
                animate={done ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {i === 0 && <Package className="h-4 w-4" />}
                {i === 1 && <Truck className="h-4 w-4" />}
                {i === 2 && <CircleDot className="h-4 w-4" />}
                {i === 3 && <CheckCircle2 className="h-4 w-4" />}
              </motion.div>
              <div>
                <p
                  className={`font-medium ${done ? "text-white" : "text-slate-500"}`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-slate-500">{step.sub}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* ——— Shipping calculator ——— */
function ShippingWidget({
  weight,
  dest,
  onWeight,
  onDest,
  price,
}: {
  weight: number;
  dest: number;
  onWeight: (n: number) => void;
  onDest: (n: number) => void;
  price: number;
}) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">Weight</span>
          <span className="font-mono text-sky-300">{weight} kg</span>
        </div>
        <input
          type="range"
          min={1}
          max={120}
          value={weight}
          onChange={(e) => onWeight(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-sky-500"
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">Destination zone</span>
          <span className="font-mono text-sky-300">Zone {dest}</span>
        </div>
        <input
          type="range"
          min={1}
          max={8}
          value={dest}
          onChange={(e) => onDest(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400"
        />
      </div>
      <div className="mt-auto flex items-center justify-between rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3">
        <span className="text-sm text-slate-300">Est. freight</span>
        <motion.span
          key={price}
          initial={{ scale: 0.92, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-mono text-xl font-semibold text-white"
        >
          ${price}
        </motion.span>
      </div>
    </div>
  );
}

/* ——— Map ——— */
function LogisticsMap() {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-xl">
      <svg
        viewBox="0 0 800 360"
        className="h-full w-full text-white/10"
        aria-hidden
      >
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Stylized landmasses */}
        <ellipse cx="180" cy="200" rx="120" ry="70" fill="currentColor" />
        <ellipse cx="400" cy="160" rx="90" ry="55" fill="currentColor" />
        <ellipse cx="620" cy="190" rx="100" ry="65" fill="currentColor" />
        <ellipse cx="520" cy="260" rx="70" ry="40" fill="currentColor" />
        {/* Ports */}
        <circle cx="200" cy="180" r="6" className="fill-sky-400" />
        <circle cx="600" cy="170" r="6" className="fill-cyan-400" />
        <path
          d="M 200 180 Q 400 40 600 170"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="10 14"
          className="path-dash-animate"
        />
      </svg>
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-xs text-slate-400">
        <MapPin className="h-3.5 w-3.5 text-sky-400" />
        <span>Active lane · Pacific corridor</span>
      </div>
    </div>
  );
}

/* ——— Table ——— */
const MOCK_SHIPMENTS: ShipmentRow[] = [
  { id: "GL-7X2K1", route: "SIN → LAX", phase: "shipped", eta: "Feb 6" },
  { id: "GL-9M4PQ", route: "AMS → DXB", phase: "out", eta: "Feb 5" },
  { id: "GL-3N8RT", route: "NRT → SEA", phase: "arrived", eta: "Feb 4" },
  { id: "GL-2B5HL", route: "CDG → JFK", phase: "ordered", eta: "Feb 9" },
];

function StatusIcon({ phase }: { phase: TimelinePhase }) {
  switch (phase) {
    case "ordered":
      return <Package className="h-4 w-4 text-slate-400" aria-hidden />;
    case "shipped":
      return <Truck className="h-4 w-4 text-sky-400" aria-hidden />;
    case "out":
      return <CircleDot className="h-4 w-4 text-amber-400" aria-hidden />;
    case "arrived":
      return <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />;
    default:
      return <Package className="h-4 w-4" aria-hidden />;
  }
}

function ShipmentTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
            <th className="pb-3 pr-4 font-medium">ID</th>
            <th className="pb-3 pr-4 font-medium">Route</th>
            <th className="pb-3 pr-4 font-medium">Status</th>
            <th className="pb-3 font-medium">ETA</th>
          </tr>
        </thead>
        <tbody className="text-slate-200">
          {MOCK_SHIPMENTS.map((row) => (
            <tr
              key={row.id}
              className="border-b border-white/5 transition-colors hover:bg-white/[0.04]"
            >
              <td className="py-3 pr-4 font-mono text-sky-200/90">{row.id}</td>
              <td className="py-3 pr-4">{row.route}</td>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center gap-2">
                  <StatusIcon phase={row.phase} />
                  <span className="capitalize">{row.phase.replace("out", "out for delivery")}</span>
                </span>
              </td>
              <td className="py-3 text-slate-400">{row.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ——— Bento shell ——— */
function BentoCard({
  children,
  className = "",
  title,
  subtitle,
}: {
  children: ReactNode;
  className?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] md:p-6 ${className}`}
    >
      <header className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400/90">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </motion.article>
  );
}

/* ——— App ——— */
export default function App() {
  const [tracking, setTracking] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [timelinePhase, setTimelinePhase] = useState<TimelinePhase>("ordered");
  const [weight, setWeight] = useState(24);
  const [destZone, setDestZone] = useState(4);

  const activeSearch = searchFocused || tracking.length > 0;
  const price = useMemo(() => formatPrice(weight, destZone), [weight, destZone]);

  function handleTrack() {
    setTimelinePhase(phaseFromTracking(tracking || "GL-0"));
  }

  return (
    <div className="min-h-screen bg-midnight bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.12),transparent)] text-slate-200">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/40">
              <Truck className="h-5 w-5 text-sky-300" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Nexus Freight</p>
              <p className="text-xs text-slate-500">Operations console</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live network
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
          <BentoCard
            title="Track"
            subtitle="Global visibility"
            className="lg:col-span-4"
          >
            <TrackingHero
              value={tracking}
              onChange={setTracking}
              onSearch={handleTrack}
              active={activeSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </BentoCard>

          <BentoCard title="Shipment timeline" subtitle="Motion-tracked milestones">
            <SmartTimeline phase={timelinePhase} />
          </BentoCard>

          <BentoCard title="Rate estimator" subtitle="Sliders update instantly">
            <ShippingWidget
              weight={weight}
              dest={destZone}
              onWeight={setWeight}
              onDest={setDestZone}
              price={price}
            />
          </BentoCard>

          <BentoCard title="Network map" subtitle="Active corridor visualization" className="lg:col-span-2">
            <LogisticsMap />
          </BentoCard>

          <BentoCard title="Active shipments" subtitle="High-contrast ledger" className="lg:col-span-2">
            <ShipmentTable />
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
