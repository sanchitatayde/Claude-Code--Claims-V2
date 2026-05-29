import { TopBar } from "@/components/mobile/TopBar";

export const metadata = { title: "Contact your admin · Zoop.one" };

export default function ContactAdminPage() {
  return (
    <>
      <TopBar variant="back" title="Help" backHref="/login" />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        <div className="px-5 py-8 flex flex-col items-center text-center">
          <span className="h-14 w-14 rounded-full bg-brand-50 text-brand-700 inline-flex items-center justify-center mb-4" aria-hidden>
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-2v-7h4z" />
              <path d="M3 19a2 2 0 0 0 2 2h2v-7H3z" />
            </svg>
          </span>

          <h1 className="font-heading text-[22px] font-bold leading-snug">
            Contact your admin
          </h1>
          <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-[280px]">
            For login &amp; access issues — including OTP problems, locked accounts, or wrong
            registered number — your insurer&apos;s admin team is the fastest route to help.
          </p>

          <div className="mt-6 w-full rounded-2xl border border-border bg-white p-4 text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Admin contact
            </p>
            <p className="mt-2 font-heading text-[15px] font-bold">
              {/* TODO: real admin contact (deferred) */}
              admin@your-insurer.example
            </p>
            <p className="mt-1 text-[12px] text-muted tnum">+91 1800-XXX-XXXX</p>
          </div>

          <p className="mt-6 text-[12px] text-subtle">
            Already signed in? Open the menu &rarr; <span className="text-ink font-medium">Support</span> for in-app help.
          </p>
        </div>
      </div>
    </>
  );
}
