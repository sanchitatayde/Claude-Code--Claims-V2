"use client";

import * as React from "react";
import Link from "next/link";
import { useUI } from "@/lib/store";
import { MOCK_USER } from "@/lib/mock-data";
import { Drawer } from "./Drawer";

export function MenuDrawer() {
  const open = useUI((s) => s.menuOpen);
  const close = useUI((s) => s.closeMenu);

  return (
    <Drawer open={open} side="left" width={320} onClose={close} ariaLabel="Main menu">
      <div className="h-[47px]" aria-hidden />

      <div className="p-4 space-y-3">
        {/* User card — TODO: destination (deferred per user) */}
        <button
          type="button"
          className="w-full flex items-center gap-3 p-3 rounded-2xl bg-brand-50 border border-brand-100 text-left hover:bg-brand-100 transition-colors"
        >
          <span className="h-11 w-11 rounded-full bg-black text-white font-semibold inline-flex items-center justify-center text-[15px]">
            {MOCK_USER.initials}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-heading text-[16px] font-semibold leading-tight">
              {MOCK_USER.name}
            </span>
            <span className="block text-[12px] text-muted mt-0.5 tnum">
              {MOCK_USER.phone}
            </span>
          </span>
          <Chevron />
        </button>

        {/* My Claims */}
        <Link
          href="/my-claims"
          onClick={close}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-alt text-left"
        >
          <span className="h-10 w-10 rounded-lg bg-surface-alt inline-flex items-center justify-center text-muted">
            <DocIcon />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-heading text-[15px] font-semibold leading-tight">
              My Claims
            </span>
            <span className="block text-[12px] text-muted mt-0.5">
              Current claims and history
            </span>
          </span>
          <Chevron />
        </Link>

        {/* Support */}
        <Link
          href="/help"
          onClick={close}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-alt text-left"
        >
          <span className="h-10 w-10 rounded-lg bg-surface-alt inline-flex items-center justify-center text-muted">
            <ChatIcon />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-heading text-[15px] font-semibold leading-tight">
              Support
            </span>
            <span className="block text-[12px] text-muted mt-0.5">
              24×7 chat service
            </span>
          </span>
          <Chevron />
        </Link>
      </div>
    </Drawer>
  );
}

function Chevron() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-subtle">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
