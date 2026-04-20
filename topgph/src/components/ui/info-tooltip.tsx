"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  term: string;
  description: string;
}

export function InfoTooltip({ term, description }: InfoTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="info-tooltip-trigger"
            aria-label={`Info about ${term}`}
          >
            <Info className="w-2.5 h-2.5" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-[100] max-w-xs px-4 py-3 rounded-xl bg-surface border border-border text-sm text-gray-300 shadow-2xl shadow-black/40"
            sideOffset={5}
          >
            <p className="font-semibold text-white mb-1">{term}</p>
            <p className="leading-relaxed">{description}</p>
            <Tooltip.Arrow className="fill-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
