"use client";

import * as React from "react";

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Segmented chip — used by the Vehicle / Phone toggle on /login.
 */
export function Chip({ children, selected, onClick, icon, className = "" }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-lg text-[13px] font-medium transition-colors",
        selected
          ? "bg-white text-ink shadow-[var(--elev-1)]"
          : "bg-transparent text-muted hover:text-ink",
        className,
      ].join(" ")}
      aria-pressed={selected}
    >
      {icon}
      {children}
    </button>
  );
}
