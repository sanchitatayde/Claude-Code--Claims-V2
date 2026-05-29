"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { HelpClaimHeader } from "@/components/help/HelpClaimHeader";
import { getHelpClaim, ISSUE_LIST } from "@/lib/mock-data";
import type { IssueSummary } from "@/lib/types";

export default function IssuesPage() {
  return (
    <React.Suspense fallback={<TopBar variant="back" title="What's the issue?" backHref="/help/pick-claim" />}>
      <IssuesContent />
    </React.Suspense>
  );
}

function IssuesContent() {
  const params = useSearchParams();
  const claimShortId = params.get("claim");
  const claim = getHelpClaim(claimShortId);

  const featured = ISSUE_LIST.filter((i) => i.group === "featured");
  const payments = ISSUE_LIST.filter((i) => i.group === "payments");
  const estimates = ISSUE_LIST.filter((i) => i.group === "estimates");

  return (
    <>
      <TopBar variant="back" title="What's the issue?" backHref="/help/pick-claim" />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        <HelpClaimHeader claim={claim} />

        <div className="px-5 py-4 space-y-6">
          {/* Featured */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              Most relevant for this claim
            </h2>
            <ul className="space-y-2.5">
              {featured.map((i) => (
                <li key={i.id}>
                  <FeaturedIssueCard issue={i} claimShortId={claim.shortId} />
                </li>
              ))}
            </ul>
          </section>

          {/* All issues */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              All issues
            </h2>

            <IssueGroup title="Payments & payouts" issues={payments} claimShortId={claim.shortId} />
            <IssueGroup title="Estimates" issues={estimates} claimShortId={claim.shortId} className="mt-4" />
          </section>
        </div>
      </div>
    </>
  );
}

function FeaturedIssueCard({
  issue,
  claimShortId,
}: {
  issue: IssueSummary;
  claimShortId: string;
}) {
  return (
    <Link
      href={`/help/issues/${issue.id}?claim=${claimShortId}`}
      className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 hover:bg-surface-alt transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <h3 className="font-heading text-[15px] font-bold leading-tight flex-1 min-w-0">
            {issue.title}
          </h3>
          {issue.actionNeeded ? (
            <span className="shrink-0 inline-flex items-center rounded-md bg-warn-100 text-warn px-2 py-0.5 text-[10px] font-semibold tracking-wider">
              ACTION NEEDED
            </span>
          ) : null}
        </div>
        {issue.sub ? (
          <p className="mt-1 text-[12px] text-muted leading-relaxed">{issue.sub}</p>
        ) : null}
      </div>
      <Chevron />
    </Link>
  );
}

function IssueGroup({
  title,
  issues,
  claimShortId,
  className,
}: {
  title: string;
  issues: IssueSummary[];
  claimShortId: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-heading text-[13px] font-bold mb-2">{title}</h3>
      <ul className="rounded-2xl border border-border bg-white overflow-hidden">
        {issues.map((i, idx) => (
          <li key={i.id} className={idx > 0 ? "border-t border-neutral-100" : undefined}>
            <Link
              href={`/help/issues/${i.id}?claim=${claimShortId}`}
              className="flex items-center gap-3 p-3 hover:bg-surface-alt transition-colors"
            >
              <span className="flex-1 min-w-0 text-[14px] text-ink">{i.title}</span>
              <Chevron />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chevron() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-subtle shrink-0" aria-hidden>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}
