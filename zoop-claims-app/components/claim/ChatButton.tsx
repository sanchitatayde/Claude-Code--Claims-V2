import Link from "next/link";

export function ChatButton() {
  return (
    <Link
      href="/help"
      aria-label="Open help"
      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border-strong text-ink hover:bg-surface-alt"
    >
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </Link>
  );
}

interface FooterProps {
  text?: string;
}
export function ClaimFooter({ text = "IAR Services - Supporting your claims since 2003" }: FooterProps) {
  return (
    <p className="text-center text-[11px] text-subtle pt-2 pb-4">{text}</p>
  );
}
