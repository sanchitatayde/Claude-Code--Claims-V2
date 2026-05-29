"use client";

import * as React from "react";
import Link from "next/link";
import { useUI, useNotifications } from "@/lib/store";
import { ACTIVE_CLAIMS, TASKS } from "@/lib/mock-data";
import { ActiveClaimCarousel } from "@/components/mobile/ActiveClaimCarousel";
import { MenuDrawer } from "@/components/mobile/MenuDrawer";
import { NotificationsDrawer } from "@/components/mobile/NotificationsDrawer";

export default function DashboardPage() {
  const openMenu = useUI((s) => s.openMenu);
  const openNotifications = useUI((s) => s.openNotifications);
  const unread = useNotifications((s) => s.items.filter((n) => !n.read).length);

  return (
    <>
      {/* Top bar — burger (no chrome) + bell (thin circular outline) */}
      <div className="flex items-center gap-3 px-3 py-2 bg-white border-b border-neutral-100">
        <button
          aria-label="Open menu"
          onClick={openMenu}
          className="h-10 w-10 inline-flex items-center justify-center text-ink hover:bg-surface-alt rounded-md"
        >
          <BurgerIcon />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-[16px] font-semibold leading-tight flex items-center gap-1.5">
            Hi Ramesh <span aria-hidden>👋</span>
          </h1>
          <p className="text-[12px] text-muted leading-tight">
            You have <strong className="font-semibold text-ink">{ACTIVE_CLAIMS.length} active claims</strong>
          </p>
        </div>

        <Link
          href="/help"
          aria-label="Open help"
          className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border-strong text-ink hover:bg-surface-alt"
        >
          <ChatIcon />
        </Link>

        <button
          aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
          onClick={openNotifications}
          className="relative h-10 w-10 inline-flex items-center justify-center rounded-full border border-border-strong text-ink hover:bg-surface-alt"
        >
          <BellIcon />
          {unread > 0 && (
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
          )}
        </button>
      </div>

      <div className="flex-1 px-5 py-4 overflow-y-auto bg-white">
        <ActiveClaimCarousel claims={ACTIVE_CLAIMS} />

        {/* Tasks */}
        <section className="mt-6">
          <h2 className="font-heading text-[16px] font-bold flex items-center gap-2">
            Tasks for you
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-surface-alt text-[11px] font-semibold text-ink">
              {TASKS.length}
            </span>
          </h2>

          <ul className="mt-3 rounded-2xl border border-border bg-white overflow-hidden">
            {TASKS.map((t, i) => (
              <li
                key={t.id}
                className={i > 0 ? "border-t border-neutral-100" : ""}
              >
                <button
                  type="button"
                  // TODO: task destination (deferred per user)
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-surface-alt transition-colors"
                >
                  <span className="h-10 w-10 rounded-lg bg-surface-alt inline-flex items-center justify-center text-muted shrink-0">
                    {t.icon === "doc" ? <DocIcon /> : <CameraIcon />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-heading text-[14px] font-semibold leading-tight">
                      {t.title}
                    </span>
                    <span className="block text-[12px] text-muted mt-0.5 truncate">
                      {t.claimVehicle} · {t.claimShortId}
                    </span>
                  </span>
                  {t.dueLabel ? (
                    <span className="shrink-0 inline-flex items-center rounded-md bg-warn-100 text-warn px-2 py-0.5 text-[11px] font-semibold">
                      {t.dueLabel}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Drawers — live inside the phone frame */}
      <MenuDrawer />
      <NotificationsDrawer />
    </>
  );
}

function BurgerIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
