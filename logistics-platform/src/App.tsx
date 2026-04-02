import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleDot,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { TrackingComponent } from "./components/TrackingComponent";
import {
  generateShipmentList,
  type TrackingSnapshot,
} from "./lib/trackingEngine";

function formatPrice(weight: number, dest: number): number {
  return Math.round(12 + weight * 2.4 + dest * 18 + (weight * dest) / 80);
}

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
    <div className="flex min-h-0 flex-col gap-6">
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

function LogisticsMap() {
  return (
    <div className="relative min-h-[200px] overflow-hidden rounded-xl sm:min-h-[220px]">
      <svg
        viewBox="0 0 800 360"
        className="h-full w-full max-w-full text-white/10"
        aria-hidden
      >
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <ellipse cx="180" cy="200" rx="120" ry="70" fill="currentColor" />
        <ellipse cx="400" cy="160" rx="90" ry="55" fill="currentColor" />
        <ellipse cx="620" cy="190" rx="100" ry="65" fill="currentColor" />
        <ellipse cx="520" cy="260" rx="70" ry="40" fill="currentColor" />
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
        <MapPin className="h-3.5 w-3.5 shrink-0 text-sky-400" aria-hidden />
        <span>Active lane · Pacific corridor</span>
      </div>
    </div>
  );
}

function statusIcon(statusLabel: string) {
  const s = statusLabel.toLowerCase();
  if (s.includes("delivered")) {
    return <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />;
  }
  if (s.includes("out")) {
    return <CircleDot className="h-4 w-4 text-amber-400" aria-hidden />;
  }
  if (s.includes("transit") || s.includes("processing")) {
    return <Truck className="h-4 w-4 text-sky-400" aria-hidden />;
  }
  return <Package className="h-4 w-4 text-slate-400" aria-hidden />;
}

function ShipmentTable({ seed }: { seed: string }) {
  const rows = useMemo(() => generateShipmentList(seed), [seed]);

  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
            <th className="pb-3 pr-3 font-medium sm:pr-4">ID</th>
            <th className="pb-3 pr-3 font-medium sm:pr-4">Route</th>
            <th className="pb-3 pr-3 font-medium sm:pr-4">Status</th>
            <th className="pb-3 font-medium">ETA</th>
          </tr>
        </thead>
        <tbody className="text-slate-200">
          {rows.map((row) => (
            <tr
              key={`${row.id}-${row.eta}`}
              className="border-b border-white/5 transition-colors hover:bg-white/[0.04]"
            >
              <td className="py-3 pr-3 font-mono text-xs text-sky-200/90 sm:pr-4 sm:text-sm">
                {row.id}
              </td>
              <td className="py-3 pr-3 sm:pr-4">{row.route}</td>
              <td className="py-3 pr-3 sm:pr-4">
                <span className="inline-flex items-center gap-2">
                  {statusIcon(row.statusLabel)}
                  <span>{row.statusLabel}</span>
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
      className={`min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] sm:p-5 md:p-6 ${className}`}
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

export default function App() {
  const [snapshot, setSnapshot] = useState<TrackingSnapshot | null>(null);
  const [searching, setSearching] = useState(false);
  const [weight, setWeight] = useState(24);
  const [destZone, setDestZone] = useState(4);

  const tableSeed = snapshot?.lookupId ?? "default-ledger";
  const price = useMemo(() => formatPrice(weight, destZone), [weight, destZone]);

  return (
    <div className="min-h-screen bg-midnight bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.12),transparent)] text-slate-200">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/40">
              <Truck className="h-5 w-5 text-sky-300" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-white">Nexus Freight</p>
              <p className="text-xs text-slate-500">Operations console</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
            Live network
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <BentoCard
            title="Track"
            subtitle="Global visibility"
            className="md:col-span-2 lg:col-span-4"
          >
            <TrackingComponent
              snapshot={snapshot}
              searching={searching}
              onSearchingChange={setSearching}
              onResult={setSnapshot}
            />
          </BentoCard>

          <BentoCard
            title="Rate estimator"
            subtitle="Sliders update instantly"
            className="lg:col-span-2"
          >
            <ShippingWidget
              weight={weight}
              dest={destZone}
              onWeight={setWeight}
              onDest={setDestZone}
              price={price}
            />
          </BentoCard>

          <BentoCard
            title="Network map"
            subtitle="Active corridor visualization"
            className="lg:col-span-2"
          >
            <LogisticsMap />
          </BentoCard>

          <BentoCard
            title="Active shipments"
            subtitle="Dynamic ledger"
            className="md:col-span-2 lg:col-span-4"
          >
            <ShipmentTable seed={tableSeed} />
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
