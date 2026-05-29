"use client";

import * as React from "react";
import Link from "next/link";
import { TopBar } from "@/components/mobile/TopBar";
import { ALL_CLAIMS } from "@/lib/mock-data";
import type { ClaimStatusKey, ClaimSummary } from "@/lib/types";

type Filter = "ALL" | ClaimStatusKey;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "UNDER INVESTIGATION", label: "Investigation" },
  { key: "REGISTERED", label: "Registered" },
  { key: "REPUDIATED", label: "Repudiated" },
  { key: "UNDER SETTLEMENT", label: "Under Settlement" },
  { key: "CLOSED", label: "Closed" },
];

export default function MyClaimsPage() {
  const [active, setActive] = React.useState<Filter>("ALL");

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { ALL: ALL_CLAIMS.length };
    for (const claim of ALL_CLAIMS) {
      c[claim.status] = (c[claim.status] ?? 0) + 1;
    }
    return c;
  }, []);

  const visible = React.useMemo(
    () =>
      active === "ALL" ? ALL_CLAIMS : ALL_CLAIMS.filter((c) => c.status === active),
    [active]
  );

  return (
    <>
      <TopBar variant="back" title="My Claims" backHref="/dashboard" />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        {/* Filter chips — horizontally scrollable */}
        <div className="px-5 py-3 bg-white border-b border-neutral-100">
          <div
            className="flex gap-2 overflow-x-auto -mx-5 px-5 scrollbar-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {FILTERS.map((f) => {
              const count = counts[f.key] ?? 0;
              if (f.key !== "ALL" && count === 0) return null;
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={[
                    "shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-ink text-white"
                      : "bg-white border border-border-strong text-ink hover:bg-surface-alt",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <span>{f.label}</span>
                  <span
                    className={[
                      "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold tnum",
                      isActive ? "bg-white/15" : "bg-brand-100 text-brand-700",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <ul className="px-5 py-4 space-y-3">
          {visible.length === 0 ? (
            <li className="rounded-2xl border border-border bg-white p-8 text-center text-muted text-[13px]">
              No claims in this filter.
            </li>
          ) : (
            visible.map((c) => (
              <li key={c.id}>
                <ClaimRow claim={c} />
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

function ClaimRow({ claim }: { claim: ClaimSummary }) {
  return (
    <Link
      href={`/claims/${claim.shortId}`}
      className="block rounded-2xl border border-border bg-white p-4 hover:bg-surface-alt transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {claim.shortId}
        </p>
        <StatusPill status={claim.status} />
      </div>
      <h3 className="font-heading text-[16px] font-bold mt-1">{claim.vehicle}</h3>
      <p className="text-[12px] text-muted mt-0.5 tnum">
        {claim.regNumber} · {claim.insurer}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span
          className={[
            "text-[14px] font-semibold leading-tight",
            claim.statusNoteTone === "success" && "text-brand-700",
            claim.statusNoteTone === "danger" && "text-danger",
            claim.statusNoteTone === "neutral" && "text-ink",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {claim.statusNote}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] text-muted shrink-0">
          {claim.dateLabel}
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: ClaimStatusKey }) {
  const tone: Record<ClaimStatusKey, string> = {
    REGISTERED: "bg-brand-50 text-brand-700",
    "UNDER INVESTIGATION": "bg-warn-100 text-warn",
    "UNDER SETTLEMENT": "bg-brand-100 text-brand-700",
    REPUDIATED: "bg-danger-50 text-danger",
    CLOSED: "bg-neutral-100 text-muted",
  };
  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider",
        tone[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}
