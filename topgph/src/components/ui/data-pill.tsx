"use client";

import type { LucideIcon } from "lucide-react";

interface DataPillProps {
  icon?: LucideIcon;
  label: string;
  value?: string;
  className?: string;
}

export function DataPill({ icon: Icon, label, value, className = "" }: DataPillProps) {
  return (
    <span className={`data-pill ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 data-pill-icon" />}
      {value ? (
        <>
          <span className="text-white font-bold">{value}</span>
          <span className="text-gray-400 font-medium">{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </span>
  );
}
