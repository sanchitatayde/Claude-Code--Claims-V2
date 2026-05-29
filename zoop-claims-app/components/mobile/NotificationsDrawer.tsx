"use client";

import * as React from "react";
import { useUI, useNotifications } from "@/lib/store";
import { Drawer } from "./Drawer";
import type { Notification } from "@/lib/types";

export function NotificationsDrawer() {
  const open = useUI((s) => s.notificationsOpen);
  const close = useUI((s) => s.closeNotifications);
  const items = useNotifications((s) => s.items);

  return (
    <Drawer open={open} side="top" height={420} onClose={close} ariaLabel="Notifications">
      <div className="h-[47px]" aria-hidden />
      <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-100">
        <h2 className="font-heading text-[16px] font-semibold">Notifications</h2>
        <button
          onClick={close}
          aria-label="Close notifications"
          className="text-muted hover:text-ink text-[18px] leading-none px-2"
        >
          ✕
        </button>
      </div>
      <ul className="overflow-y-auto flex-1">
        {items.map((n) => (
          <NotificationRow key={n.id} n={n} />
        ))}
      </ul>
    </Drawer>
  );
}

function NotificationRow({ n }: { n: Notification }) {
  const markRead = useNotifications((s) => s.markRead);
  return (
    <li>
      <button
        type="button"
        onClick={() => markRead(n.id)}
        className={[
          "w-full flex items-start gap-3 px-4 py-3 text-left border-b border-neutral-100 transition-colors",
          n.read ? "bg-white" : "bg-brand-50/40 hover:bg-brand-50",
        ].join(" ")}
      >
        <span
          className={[
            "h-9 w-9 shrink-0 rounded-lg inline-flex items-center justify-center",
            n.read ? "bg-surface-alt text-muted" : "bg-brand-100 text-brand-700",
          ].join(" ")}
          aria-hidden
        >
          <NotifIcon kind={n.icon} />
        </span>
        <span className="flex-1 min-w-0">
          <span className={["block text-[14px] leading-snug", n.read ? "text-muted" : "text-ink font-medium"].join(" ")}>
            {n.title}
          </span>
          <span className="block text-[11px] text-subtle mt-0.5">{n.meta}</span>
        </span>
        {!n.read && (
          <span
            className="mt-1.5 h-2 w-2 rounded-full bg-brand-500 shrink-0"
            aria-label="Unread"
          />
        )}
      </button>
    </li>
  );
}

function NotifIcon({ kind }: { kind: Notification["icon"] }) {
  if (kind === "photo") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    );
  }
  if (kind === "doc") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  }
  // check
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
