"use client";

import * as React from "react";

type Side = "left" | "top";

interface DrawerProps {
  open: boolean;
  side: Side;
  onClose: () => void;
  /** width when side='left' (px) */
  width?: number;
  /** height when side='top' (px) */
  height?: number;
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Slide-over panel. No scrim — an invisible click-catcher closes on outside tap.
 * Lives INSIDE the phone frame (uses absolute positioning + parent's overflow:hidden).
 */
export function Drawer({
  open,
  side,
  onClose,
  width = 320,
  height = 360,
  children,
  ariaLabel,
}: DrawerProps) {
  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const panelStyle: React.CSSProperties =
    side === "left"
      ? {
          width: `${width}px`,
          top: 0,
          left: 0,
          bottom: 0,
          transform: open ? "translateX(0)" : `translateX(-${width + 24}px)`,
        }
      : {
          height: `${height}px`,
          top: 0,
          left: 0,
          right: 0,
          transform: open ? "translateY(0)" : `translateY(-${height + 24}px)`,
        };

  return (
    <>
      {/* Invisible click-catcher — no blur, no dim */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={[
          "absolute inset-0 z-20 transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "transparent" }}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="false"
        aria-label={ariaLabel}
        aria-hidden={!open}
        className={[
          "absolute z-30 bg-white transition-transform duration-300 ease-out",
          side === "left" ? "shadow-[0_10px_40px_rgba(0,0,0,0.08)]" : "shadow-[0_10px_40px_rgba(0,0,0,0.06)]",
          "flex flex-col",
        ].join(" ")}
        style={panelStyle}
      >
        {children}
      </aside>
    </>
  );
}
