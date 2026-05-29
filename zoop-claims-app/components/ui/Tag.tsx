import * as React from "react";

type Variant = "neutral" | "success" | "warn" | "danger" | "info" | "brand";

const styles: Record<Variant, string> = {
  neutral: "bg-neutral-100 text-muted",
  success: "bg-brand-50 text-brand-700",
  warn: "bg-warn-100 text-warn",
  danger: "bg-danger-50 text-danger",
  info: "bg-neutral-100 text-ink",
  brand: "bg-brand-100 text-brand-700",
};

interface TagProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Tag({ children, variant = "neutral", className = "" }: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

interface StatusPillProps {
  children: React.ReactNode;
  variant?: Variant;
}

export function StatusPill({ children, variant = "warn" }: StatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
        styles[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
