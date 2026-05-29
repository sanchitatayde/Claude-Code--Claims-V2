"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { HelpClaimHeader } from "@/components/help/HelpClaimHeader";
import { getHelpClaim, getIssueResponse } from "@/lib/mock-data";

export default function IssueResponsePage() {
  return (
    <React.Suspense fallback={<TopBar variant="back" title="…" backHref="/help/pick-claim" />}>
      <IssueResponseContent />
    </React.Suspense>
  );
}

function IssueResponseContent() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const claim = getHelpClaim(search.get("claim"));
  const issue = getIssueResponse(params.id, claim);

  if (!issue) {
    return (
      <>
        <TopBar variant="back" title="Issue not found" backHref={`/help/issues?claim=${claim.shortId}`} />
        <div className="flex-1 px-5 py-6 text-[14px] text-muted">
          We couldn&apos;t find this issue. Go back and pick another, or talk to the team.
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        variant="back"
        title={issue.title}
        backHref={`/help/issues?claim=${claim.shortId}`}
      />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        <HelpClaimHeader claim={claim} />

        <div className="px-5 py-4 space-y-4">
          {/* "Here's what we know" — sparkle card */}
          <section className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <span className="h-7 w-7 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center" aria-hidden>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l1.8 5.4L19 9l-5 2.6L13 17l-1-5L7 9l5.2-1.6z" />
                </svg>
              </span>
              Here&apos;s what we know
            </div>
            <p className="mt-2 text-[13px] text-ink leading-relaxed">{issue.summary}</p>

            {/* Steps */}
            <ol className="mt-4 relative">
              {issue.steps.map((s, idx) => {
                const isLast = idx === issue.steps.length - 1;
                return (
                  <li key={`${s.label}-${idx}`} className="flex gap-3 pb-4 last:pb-0 relative">
                    {!isLast ? (
                      <span
                        aria-hidden
                        className={[
                          "absolute left-[7px] top-4 bottom-0 w-px",
                          s.state === "completed"
                            ? "bg-brand-500"
                            : s.state === "current"
                            ? "border-l-2 border-dashed border-border-strong bg-transparent"
                            : "bg-border-strong",
                        ].join(" ")}
                      />
                    ) : null}
                    <span aria-hidden className="relative z-10 shrink-0 mt-0.5">
                      <StepBullet state={s.state} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={[
                          "font-semibold text-[13px] leading-tight",
                          s.state === "upcoming" ? "text-subtle" : "text-ink",
                        ].join(" ")}
                      >
                        {s.label}
                      </p>
                      {s.date ? (
                        <p
                          className={[
                            "mt-0.5 text-[11px] tnum",
                            s.state === "upcoming" ? "text-subtle" : "text-muted",
                          ].join(" ")}
                        >
                          {s.date}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Confirmation rows */}
          {issue.confirms && issue.confirms.length > 0 ? (
            <ul className="space-y-2">
              {issue.confirms.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-white p-3"
                >
                  <span className="text-brand-700 shrink-0 mt-0.5" aria-hidden>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-[13px] text-ink leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-center text-[11px] text-subtle pt-2 pb-2">
            Still stuck?{" "}
            <Link href="/help" className="text-ink font-semibold underline-offset-2 hover:underline">
              Chat with us
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function StepBullet({ state }: { state: "completed" | "current" | "upcoming" }) {
  if (state === "completed") {
    return <span className="h-3.5 w-3.5 rounded-full bg-brand-500 inline-block" />;
  }
  if (state === "current") {
    return <span className="h-3.5 w-3.5 rounded-full border-2 border-warn bg-white inline-block" />;
  }
  return <span className="h-3.5 w-3.5 rounded-full border-2 border-border-strong bg-white inline-block" />;
}
