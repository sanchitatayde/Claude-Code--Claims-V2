import Link from "next/link";
import { TopBar } from "@/components/mobile/TopBar";
import { ALL_CLAIMS } from "@/lib/mock-data";
import type { ClaimStatusKey, ClaimSummary } from "@/lib/types";

export const metadata = { title: "Pick a claim · Zoop.one" };

export default function PickClaimPage() {
  return (
    <>
      <TopBar
        variant="back"
        title="Pick a claim"
        backHref="/help"
        rightSlot={
          <button
            aria-label="Search claims"
            className="h-10 w-10 inline-flex items-center justify-center rounded-full text-ink hover:bg-surface-alt"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        <ul className="px-5 py-4 space-y-3">
          {ALL_CLAIMS.map((c) => (
            <li key={c.id}>
              <ClaimRow claim={c} />
            </li>
          ))}
        </ul>

        {/* "Not about a specific claim" — sticky-ish footer */}
        <div className="px-5 pb-5">
          <Link
            href="/help/contact-admin"
            className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3 hover:bg-surface-alt transition-colors"
          >
            <span className="h-10 w-10 rounded-full bg-surface-alt inline-flex items-center justify-center text-muted shrink-0" aria-hidden>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-heading text-[14px] font-bold leading-tight">
                Not about a specific claim
              </span>
              <span className="block text-[12px] text-muted mt-0.5">
                General question or account help
              </span>
            </span>
            <Chevron />
          </Link>
        </div>
      </div>
    </>
  );
}

function ClaimRow({ claim }: { claim: ClaimSummary }) {
  return (
    <Link
      href={`/help/issues?claim=${claim.shortId}`}
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
          <Chevron />
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

function Chevron() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}
