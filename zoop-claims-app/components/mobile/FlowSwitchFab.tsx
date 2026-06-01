"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/** Go through the Garage bridge endpoint so the visitor skips the
 *  garage-ext /unlock gate (they've already authenticated on this side). */
const GARAGE_URL = "https://garage-ext.vercel.app/api/bridge?next=/login";

/**
 * Floating "Switch to Garage" CTA pinned to the bottom-right of the phone
 * frame. Lets the user jump to the Garage prototype from anywhere in the
 * Customer flow without going back through the access gate.
 *
 * Hidden on /access — the gate's dropdown already handles flow choice there.
 */
export function FlowSwitchFab() {
  const pathname = usePathname() || "";

  if (pathname.startsWith("/access")) return null;

  return (
    <a
      href={GARAGE_URL}
      // Open in the same tab so it feels like a flow switch, not a popup.
      className="absolute right-4 bottom-5 z-30 group inline-flex items-center gap-2 h-12 pl-3 pr-4 rounded-full bg-ink text-white shadow-lg shadow-black/20 hover:bg-neutral-800 transition-all"
      aria-label="Switch to Garage flow"
    >
      <span
        className="h-8 w-8 rounded-full bg-white/15 inline-flex items-center justify-center"
        aria-hidden
      >
        <GarageIcon />
      </span>
      <span className="font-heading text-[13px] font-semibold leading-none">
        Switch to Garage
      </span>
    </a>
  );
}

function GarageIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21v-9l9-7 9 7v9" />
      <path d="M9 21V12h6v9" />
      <path d="M3 21h18" />
    </svg>
  );
}
