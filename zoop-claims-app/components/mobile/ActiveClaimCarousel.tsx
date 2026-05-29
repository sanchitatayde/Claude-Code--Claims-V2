"use client";

import * as React from "react";
import Link from "next/link";
import type { ActiveClaim } from "@/lib/types";

interface Props {
  claims: ActiveClaim[];
  autoScrollMs?: number;
}

const TOTAL_STAGES = 4;

export function ActiveClaimCarousel({ claims, autoScrollMs = 5000 }: Props) {
  const [index, setIndex] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const pausedRef = React.useRef(false);

  React.useEffect(() => {
    if (claims.length <= 1) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % claims.length);
    }, autoScrollMs);
    return () => window.clearInterval(id);
  }, [claims.length, autoScrollMs]);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (card)
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  const onScroll = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const cardWidth = card.offsetWidth + 12;
    const i = Math.round(el.scrollLeft / cardWidth);
    if (i !== index) setIndex(i);
  }, [index]);

  return (
    <div
      onPointerEnter={() => (pausedRef.current = true)}
      onPointerLeave={() => (pausedRef.current = false)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 scrollbar-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {claims.map((c) => (
          <ClaimCard key={c.id} claim={c} />
        ))}
      </div>
      {claims.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden>
          {claims.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1.5 rounded-full transition-all",
                i === index ? "w-5 bg-ink" : "w-1.5 bg-border-strong",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ClaimCard({ claim }: { claim: ActiveClaim }) {
  const { statusChip, stageIndex, stageLabel, actionNeeded } = claim.carousel;
  return (
    <Link
      href={`/claims/${claim.shortId}`}
      aria-label={`Open ${claim.vehicle} claim`}
      className="snap-center shrink-0 w-full rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4 shadow-[var(--elev-1)] hover:from-brand-100 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {claim.id}
        </p>
        <span className="inline-flex items-center rounded-md bg-warn-100 text-warn px-2 py-0.5 text-[11px] font-semibold">
          {statusChip}
        </span>
      </div>
      <h3 className="font-heading text-[18px] font-bold mt-1">{claim.vehicle}</h3>

      <div className="mt-3">
        <p className="text-[12px] text-muted">
          Stage {stageIndex + 1} of {TOTAL_STAGES} — {stageLabel}
        </p>
        <div className="mt-2 flex items-center gap-2">
          {Array.from({ length: TOTAL_STAGES }).map((_, i) => (
            <React.Fragment key={i}>
              <span
                className={[
                  "h-2.5 w-2.5 rounded-full shrink-0",
                  i <= stageIndex ? "bg-brand-500" : "bg-border-strong",
                ].join(" ")}
              />
              {i < TOTAL_STAGES - 1 ? (
                <span
                  className={[
                    "flex-1 h-0.5",
                    i < stageIndex ? "bg-brand-500" : "bg-border-strong",
                  ].join(" ")}
                />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>

      {actionNeeded ? (
        <div
          // TODO: action-needed alert destination (deferred per user)
          className="mt-3 w-full flex items-center gap-2 text-left p-3 rounded-xl bg-white border border-warn-100"
          role="button"
          tabIndex={0}
          onClick={(e) => e.preventDefault()}
        >
          <span className="text-warn shrink-0" aria-hidden>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-warn text-[13px] leading-tight">
              Action needed
            </span>
            <span className="block text-[12px] text-muted mt-0.5">
              {actionNeeded.title} · Due {actionNeeded.dueHrs} hrs
            </span>
          </span>
          <span className="text-subtle shrink-0">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>
        </div>
      ) : null}
    </Link>
  );
}
