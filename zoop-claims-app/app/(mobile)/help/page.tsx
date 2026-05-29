import Link from "next/link";
import { TopBar } from "@/components/mobile/TopBar";
import { OpenCaseRow } from "@/components/help/CaseRow";
import { CategoryGrid } from "@/components/help/CategoryGrid";
import { SUPPORT_CASES, QUICK_READS } from "@/lib/mock-data";

export const metadata = { title: "Helpdesk · Zoop.one" };

export default function HelpPage() {
  const open = SUPPORT_CASES.filter((c) => c.state === "open");

  return (
    <>
      <TopBar
        variant="back"
        title="Helpdesk"
        backHref="/dashboard"
        rightSlot={
          <button
            aria-label="Search help"
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
        <div className="px-5 py-4 space-y-5">
          {/* Open cases */}
          {open.length > 0 ? (
            <section className="space-y-2.5">
              {open.map((c) => (
                <OpenCaseRow key={c.id + c.title} c={c} />
              ))}
            </section>
          ) : null}

          {/* See all cases */}
          <Link
            href="/help/cases"
            className="flex items-center justify-center gap-2 h-12 rounded-2xl border border-border bg-white text-ink font-medium text-[14px] hover:bg-surface-alt transition-colors"
          >
            See all cases <span aria-hidden>→</span>
          </Link>

          {/* What do you need help with */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              What do you need help with?
            </h2>
            <CategoryGrid />
          </section>

          {/* Talk to us */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              Talk to us
            </h2>
            <div className="space-y-2.5">
              <TalkRow
                icon={<ChatIcon />}
                title="Chat with us"
                meta="Live now · avg reply 1 min"
                dotColor="bg-brand-500"
              />
              <TalkRow
                icon={<PhoneIcon />}
                title="Call us"
                meta="Open · 10 AM – 7 PM IST"
                dotColor="bg-brand-500"
              />
            </div>
          </section>

          {/* Quick reads */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              Quick reads
            </h2>
            <ul className="space-y-2.5">
              {QUICK_READS.map((q) => (
                <li key={q.id}>
                  <Link
                    // TODO: article destination (deferred)
                    href="#"
                    className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3 hover:bg-surface-alt transition-colors"
                  >
                    <span className="h-10 w-10 rounded-lg bg-surface-alt inline-flex items-center justify-center text-muted shrink-0" aria-hidden>
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-heading text-[14px] font-semibold leading-tight">
                        {q.title}
                      </span>
                      <span className="block text-[12px] text-muted mt-0.5">
                        {q.minutes} min read
                      </span>
                    </span>
                    <Chevron />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

function TalkRow({
  icon,
  title,
  meta,
  dotColor,
}: {
  icon: React.ReactNode;
  title: string;
  meta: string;
  dotColor: string;
}) {
  return (
    <button
      // TODO: open chat / dial (deferred)
      type="button"
      className="w-full flex items-center gap-3 rounded-2xl border border-border bg-white p-3 hover:bg-surface-alt transition-colors text-left"
    >
      <span className="h-10 w-10 rounded-lg bg-surface-alt inline-flex items-center justify-center text-ink shrink-0" aria-hidden>
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-heading text-[14px] font-bold leading-tight">{title}</span>
        <span className="flex items-center gap-1.5 text-[12px] text-muted mt-0.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} aria-hidden />
          {meta}
        </span>
      </span>
      <Chevron />
    </button>
  );
}

function ChatIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-subtle">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}
