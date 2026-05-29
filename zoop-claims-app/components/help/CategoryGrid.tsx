import Link from "next/link";
import { HELP_CATEGORIES } from "@/lib/mock-data";
import type { HelpCategory } from "@/lib/types";

/** 2-col grid of help categories. Tap → /help/pick-claim. */
export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {HELP_CATEGORIES.map((c) => (
        <CategoryCard key={c.key} c={c} />
      ))}
    </div>
  );
}

function CategoryCard({ c }: { c: HelpCategory }) {
  return (
    <Link
      href={`/help/pick-claim?cat=${c.key}`}
      className="block rounded-2xl border border-border bg-white p-3 hover:bg-surface-alt transition-colors"
    >
      <span
        className={`h-9 w-9 rounded-lg inline-flex items-center justify-center ${iconBg(c.icon)}`}
        aria-hidden
      >
        <CategoryIcon kind={c.icon} />
      </span>
      <h3 className="mt-2 font-heading text-[14px] font-bold leading-tight">{c.title}</h3>
      <p className="mt-0.5 text-[12px] text-muted leading-snug">{c.sub}</p>
    </Link>
  );
}

function iconBg(kind: HelpCategory["icon"]) {
  switch (kind) {
    case "claim":    return "bg-brand-50 text-brand-700";
    case "rupee":    return "bg-brand-50 text-brand-700";
    case "estimate": return "bg-brand-50 text-brand-700";
    case "surveyor": return "bg-warn-100 text-warn";
    case "doc":      return "bg-surface-alt text-muted";
    case "bank":     return "bg-surface-alt text-muted";
  }
}

function CategoryIcon({ kind }: { kind: HelpCategory["icon"] }) {
  switch (kind) {
    case "claim":
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case "rupee":
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 5h12M6 9h12M9 5c4 0 6 2 6 4s-2 4-6 4l5 6" />
        </svg>
      );
    case "estimate":
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <line x1="7" y1="9" x2="17" y2="9" />
          <line x1="7" y1="13" x2="13" y2="13" />
        </svg>
      );
    case "surveyor":
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
      );
    case "doc":
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      );
    case "bank":
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}
