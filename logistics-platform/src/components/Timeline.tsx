import { motion } from "framer-motion";
import { CheckCircle2, CircleDot, Package, Truck } from "lucide-react";

const STEPS = [
  { title: "Processing", sub: "Label created & picked" },
  { title: "In Transit", sub: "Moving through network" },
  { title: "Out for delivery", sub: "Final mile" },
  { title: "Delivered", sub: "Proof of delivery" },
];

type Props = {
  percent: number;
  stepIndex: number;
  active: boolean;
  animationKey?: string;
};

export function Timeline({ percent, stepIndex, active, animationKey }: Props) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span className="font-mono text-sky-300">{clamped}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            key={active ? (animationKey ?? `${clamped}-${stepIndex}`) : "idle"}
            className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-400"
            initial={{ width: "0%" }}
            animate={
              active
                ? { width: `${clamped}%` }
                : { width: "0%" }
            }
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="relative pl-2">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-sky-500/50 via-white/15 to-white/5" />
        <ul className="space-y-6">
          {STEPS.map((step, i) => {
            const done = active && i <= stepIndex;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-4"
              >
                <motion.div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                    done
                      ? "border-sky-400 bg-sky-500/30 text-sky-200"
                      : "border-white/15 bg-white/5 text-slate-500"
                  }`}
                  animate={done && active ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 0.45 }}
                >
                  {i === 0 && <Package className="h-4 w-4" aria-hidden />}
                  {i === 1 && <Truck className="h-4 w-4" aria-hidden />}
                  {i === 2 && <CircleDot className="h-4 w-4" aria-hidden />}
                  {i === 3 && <CheckCircle2 className="h-4 w-4" aria-hidden />}
                </motion.div>
                <div className="min-w-0">
                  <p className={`font-medium ${done ? "text-white" : "text-slate-500"}`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-slate-500">{step.sub}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
