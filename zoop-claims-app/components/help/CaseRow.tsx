import Link from "next/link";
import type { SupportCase } from "@/lib/types";

interface Props {
  c: SupportCase;
}

/** Open case row (Helpdesk + Your cases / OPEN section). */
export function OpenCaseRow({ c }: Props) {
  return (
    <Link
      // TODO: case thread destination (deferred — not provided yet)
      href="#"
      className="block rounded-2xl border border-border bg-white p-4 hover:bg-surface-alt transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] text-muted tracking-wide">
          {c.id} · {c.claimShortId}
        </p>
        {c.unreadCount ? (
          <span className="h-6 min-w-[24px] px-1.5 rounded-full bg-brand-400 text-ink inline-flex items-center justify-center text-[11px] font-semibold tnum">
            {c.unreadCount}
          </span>
        ) : null}
      </div>
      <h3 className="font-heading text-[15px] font-bold mt-1 leading-snug">{c.title}</h3>
      <p className="mt-2 text-right text-[11px] text-muted tnum">{c.dateLabel}</p>
    </Link>
  );
}

/** Resolved case row (Your cases · RECENTLY RESOLVED section). */
export function ResolvedCaseRow({ c }: Props) {
  return (
    <Link
      href="#"
      className="block rounded-2xl border border-border bg-white p-3 hover:bg-surface-alt transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="h-8 w-8 rounded-full bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0" aria-hidden>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-[14px] font-semibold leading-tight">{c.title}</h3>
          <p className="mt-1 text-[12px] text-muted tnum">
            {c.id} · {c.claimShortId} · {c.dateLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}
