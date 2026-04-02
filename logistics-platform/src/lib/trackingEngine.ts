/** Deterministic FNV-style hash for consistent pseudo-random state per ID. */
export function hashString(input: string): number {
  let h = 2166136261;
  const s = input.trim();
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export type TrackingSnapshot = {
  lookupId: string;
  displayId: string;
  percent: number;
  statusLabel: string;
  route: string;
  eta: string;
  stepIndex: number;
};

const ROUTES = [
  "SIN → LAX",
  "AMS → DXB",
  "NRT → SEA",
  "CDG → JFK",
  "DXB → FRA",
  "HKG → ORD",
  "MEL → SFO",
  "LHR → YYZ",
];

const STATUS_BANDS: { max: number; label: string }[] = [
  { max: 18, label: "Processing" },
  { max: 42, label: "In Transit" },
  { max: 68, label: "In Transit" },
  { max: 88, label: "Out for Delivery" },
  { max: 100, label: "Delivered" },
];

function statusFromPercent(percent: number): string {
  for (const b of STATUS_BANDS) {
    if (percent <= b.max) return b.label;
  }
  return "Delivered";
}

function stepIndexFromPercent(percent: number): number {
  if (percent < 25) return 0;
  if (percent < 50) return 1;
  if (percent < 75) return 2;
  return 3;
}

/** Any non-empty ID yields a stable snapshot (same input → same state). */
export function generateTrackingState(rawId: string): TrackingSnapshot {
  const lookupId = rawId.trim();
  const h = hashString(lookupId);
  const percent = h % 101;
  const route = ROUTES[h % ROUTES.length];
  const day = 1 + (h % 27);
  const eta = `Mar ${day}`;
  const hex = (h % 0xffffff).toString(16).toUpperCase().padStart(6, "0");
  const displayId = `GL-${hex.slice(0, 2)}${hex.slice(2, 5)}${hex.slice(5)}`;

  return {
    lookupId,
    displayId,
    percent,
    statusLabel: statusFromPercent(percent),
    route,
    eta,
    stepIndex: stepIndexFromPercent(percent),
  };
}

export type ShipmentRow = {
  id: string;
  route: string;
  statusLabel: string;
  eta: string;
};

/** Ledger rows derived from seed — no fixed hardcoded IDs in source. */
export function generateShipmentList(seed: string): ShipmentRow[] {
  return [0, 1, 2, 3].map((i) => {
    const snap = generateTrackingState(`${seed}::row::${i}`);
    return {
      id: snap.displayId,
      route: snap.route,
      statusLabel: snap.statusLabel,
      eta: snap.eta,
    };
  });
}
