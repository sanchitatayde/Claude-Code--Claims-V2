import Link from "next/link";
import { TopBar } from "@/components/mobile/TopBar";

export const metadata = { title: "Garage · Zoop.one" };

/**
 * Placeholder for the Garage flow. The real screens will be ported from the
 * Garage repo. Until then, the access gate routes "Garage" picks here so the
 * dropdown choice is observable end-to-end.
 */
export default function GarageLoginPage() {
  return (
    <>
      <TopBar variant="brand" sub="Garage" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="h-14 w-14 rounded-2xl bg-surface-alt inline-flex items-center justify-center mb-4" aria-hidden>
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="text-muted">
            <path d="M3 21v-9l9-7 9 7v9" />
            <path d="M9 21V12h6v9" />
          </svg>
        </div>
        <h1 className="font-heading text-[22px] font-bold text-ink">Garage flow</h1>
        <p className="mt-2 text-[14px] text-muted max-w-[280px] leading-relaxed">
          The Garage screens are being ported from the dedicated repo. Once shared,
          they&apos;ll land under <span className="font-mono">/garage</span>.
        </p>
        <Link
          href="/access"
          className="mt-6 text-[13px] font-semibold text-ink underline-offset-2 hover:underline"
        >
          ← Back to access
        </Link>
      </div>
    </>
  );
}
