"use client";

import * as React from "react";
import { TopBar } from "@/components/mobile/TopBar";
import { OpenCaseRow, ResolvedCaseRow } from "@/components/help/CaseRow";
import { SUPPORT_CASES, SUPPORT_TOTALS } from "@/lib/mock-data";

type Filter = "all" | "open" | "resolved";

export default function YourCasesPage() {
  const [filter, setFilter] = React.useState<Filter>("all");

  const open = React.useMemo(() => SUPPORT_CASES.filter((c) => c.state === "open"), []);
  const resolved = React.useMemo(() => SUPPORT_CASES.filter((c) => c.state === "resolved"), []);

  const showOpen = filter !== "resolved";
  const showResolved = filter !== "open";

  return (
    <>
      <TopBar
        variant="back"
        title="Your cases"
        sub="Support history across all claims"
        backHref="/help"
      />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        {/* Filter chips */}
        <div className="px-5 py-3 bg-white border-b border-neutral-100">
          <div className="flex gap-2">
            <FilterChip
              label="All"
              count={SUPPORT_TOTALS.all}
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <FilterChip
              label="Open"
              count={SUPPORT_TOTALS.open}
              active={filter === "open"}
              onClick={() => setFilter("open")}
            />
            <FilterChip
              label="Resolved"
              count={SUPPORT_TOTALS.resolved}
              active={filter === "resolved"}
              onClick={() => setFilter("resolved")}
            />
          </div>
        </div>

        <div className="px-5 py-4 space-y-5">
          {showOpen && open.length > 0 ? (
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                Open
              </h2>
              <ul className="space-y-2.5">
                {open.map((c) => (
                  <li key={c.id + c.title}>
                    <OpenCaseRow c={c} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showResolved && resolved.length > 0 ? (
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                Recently resolved
              </h2>
              <ul className="space-y-2.5">
                {resolved.map((c) => (
                  <li key={c.id + c.title}>
                    <ResolvedCaseRow c={c} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showResolved ? (
            <button
              // TODO: paginate / load all resolved (deferred)
              type="button"
              className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl border border-border bg-white text-ink font-medium text-[14px] hover:bg-surface-alt transition-colors"
            >
              See all {SUPPORT_TOTALS.resolved} resolved cases <span aria-hidden>→</span>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-[13px] font-medium transition-colors",
        active
          ? "bg-ink text-white"
          : "bg-white border border-border-strong text-ink hover:bg-surface-alt",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={[
          "inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full text-[11px] font-semibold tnum",
          active ? "bg-white/15 text-white" : "bg-surface-alt text-muted",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}
