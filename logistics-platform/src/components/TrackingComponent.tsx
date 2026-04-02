import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import type { TrackingSnapshot } from "../lib/trackingEngine";
import { generateTrackingState } from "../lib/trackingEngine";
import { Timeline } from "./Timeline";

const SEARCH_MS = 1500;

type Props = {
  onResult: (snapshot: TrackingSnapshot | null) => void;
  snapshot: TrackingSnapshot | null;
  searching: boolean;
  onSearchingChange: (v: boolean) => void;
};

export function TrackingComponent({
  onResult,
  snapshot,
  searching,
  onSearchingChange,
}: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const active = focused || value.length > 0;

  const runSearch = useCallback(() => {
    const v = value.trim();
    if (!v) {
      setInvalid(true);
      setShakeKey((k) => k + 1);
      return;
    }
    setInvalid(false);
    onResult(null);
    onSearchingChange(true);
    window.setTimeout(() => {
      onResult(generateTrackingState(v));
      onSearchingChange(false);
    }, SEARCH_MS);
  }, [value, onResult, onSearchingChange]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-12">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-sky-400/80">
        Global Logistics
      </p>
      <h1 className="text-center font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
        Track anywhere, in real time
      </h1>

      <motion.div
        key={shakeKey}
        animate={invalid ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-xl md:max-w-2xl"
      >
        <div
          className={`relative w-full rounded-2xl border p-1 transition-all duration-500 ${
            active
              ? "border-sky-400/60 bg-sky-500/10 shadow-glow"
              : "border-white/10 bg-white/[0.03]"
          } ${invalid ? "border-red-400/50" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-midnight/40 px-3 py-2 backdrop-blur-md sm:flex-nowrap md:px-4 md:py-3">
            <Search
              className={`h-5 w-5 shrink-0 transition-colors ${active ? "text-sky-300" : "text-slate-500"}`}
              aria-hidden
            />
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setInvalid(false);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && !searching && runSearch()}
              disabled={searching}
              placeholder="Enter any tracking ID"
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-60 md:text-base"
              aria-invalid={invalid}
              aria-describedby={invalid ? "track-error" : undefined}
              aria-label="Tracking number"
            />
            <button
              type="button"
              disabled={searching}
              onClick={runSearch}
              className="shrink-0 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-midnight transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
            >
              {searching ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Searching…
                </span>
              ) : (
                "Track"
              )}
            </button>
          </div>
          {active && (
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-sky-500/20 via-cyan-400/10 to-sky-500/20 blur-xl"
              aria-hidden
            />
          )}
        </div>
        {invalid && (
          <p id="track-error" className="mt-2 text-center text-sm text-red-400" role="alert">
            Please enter a valid ID
          </p>
        )}
      </motion.div>

      {snapshot && !searching && (
        <div className="w-full max-w-xl rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-slate-300 backdrop-blur-md md:max-w-2xl">
          <span className="text-slate-500">Status: </span>
          <span className="font-medium text-sky-200">{snapshot.statusLabel}</span>
          <span className="mx-2 text-slate-600">·</span>
          <span className="font-mono text-xs text-sky-300/90">{snapshot.displayId}</span>
        </div>
      )}

      <div className="w-full max-w-xl md:max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/80">
          Timeline
        </p>
        <Timeline
          percent={snapshot?.percent ?? 0}
          stepIndex={snapshot?.stepIndex ?? 0}
          active={!!snapshot && !searching}
          animationKey={snapshot?.lookupId}
        />
      </div>
    </div>
  );
}
