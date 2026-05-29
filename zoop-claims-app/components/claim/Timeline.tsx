import type { SubItemIconKind, TimelineStep } from "@/lib/types";

interface Props {
  steps: TimelineStep[];
  title?: string;
}

export function Timeline({ steps, title = "Timeline" }: Props) {
  return (
    <section>
      <h2 className="font-heading text-[18px] font-bold">{title}</h2>
      <div className="mt-3 rounded-2xl border border-border bg-white p-4">
        <ol className="relative">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <li key={`${step.label}-${idx}`} className="flex gap-3 pb-5 last:pb-0 relative">
                {!isLast ? (
                  <span
                    aria-hidden
                    className={[
                      "absolute left-[11px] top-6 bottom-0 w-px",
                      step.state === "completed"
                        ? "bg-brand-500"
                        : step.state === "current"
                        ? "border-l-2 border-dashed border-border-strong bg-transparent"
                        : "bg-border-strong",
                    ].join(" ")}
                  />
                ) : null}
                <span aria-hidden className="relative z-10 shrink-0">
                  <TimelineBullet state={step.state} />
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={[
                      "font-semibold text-[14px] leading-tight",
                      step.state === "upcoming" ? "text-subtle" : "text-ink",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>
                  {step.date ? (
                    <p
                      className={[
                        "mt-0.5 text-[11px] tnum",
                        step.state === "upcoming" ? "text-subtle" : "text-muted",
                      ].join(" ")}
                    >
                      {step.date}
                    </p>
                  ) : null}
                  {step.subItems && step.subItems.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {step.subItems.map((s, sIdx) => (
                        <li
                          key={`${s.label}-${sIdx}`}
                          // TODO: sub-item interactions (deferred per user)
                          className="flex items-start gap-2.5 rounded-lg bg-surface-alt px-3 py-2"
                        >
                          <span className="shrink-0 mt-0.5" aria-hidden>
                            <SubItemIcon kind={s.icon} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[13px] font-medium text-ink leading-tight">
                              {s.label}
                            </span>
                            {s.date ? (
                              <span className="block text-[11px] text-muted mt-0.5">{s.date}</span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineBullet({ state }: { state: TimelineStep["state"] }) {
  if (state === "completed") {
    return (
      <span className="h-[22px] w-[22px] rounded-full bg-brand-500 inline-flex items-center justify-center text-white">
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="h-[22px] w-[22px] rounded-full border-2 border-blue-500 bg-white inline-block" />
    );
  }
  return (
    <span className="h-[22px] w-[22px] rounded-full border-2 border-border-strong bg-white inline-block" />
  );
}

export function SubItemIcon({ kind }: { kind: SubItemIconKind }) {
  if (kind === "spark") {
    return (
      <span className="h-7 w-7 rounded-lg bg-warn-100 text-warn inline-flex items-center justify-center">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l1.8 5.4L19 9l-5 2.6L13 17l-1-5L7 9l5.2-1.6z" />
        </svg>
      </span>
    );
  }
  if (kind === "check") {
    return (
      <span className="h-7 w-7 rounded-lg bg-brand-100 text-brand-700 inline-flex items-center justify-center">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (kind === "doc") {
    return (
      <span className="h-7 w-7 rounded-lg bg-surface-alt text-muted inline-flex items-center justify-center">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </span>
    );
  }
  return (
    <span className="h-7 w-7 rounded-lg bg-surface-alt text-muted inline-flex items-center justify-center">
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </span>
  );
}
