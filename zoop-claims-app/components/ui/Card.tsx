import * as React from "react";

type Variant = "surface" | "tint" | "outline";

const variantClass: Record<Variant, string> = {
  surface: "bg-white border border-border",
  tint: "bg-brand-50 border border-brand-100",
  outline: "bg-white border-2 border-warn-100",
};

interface CardProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Card({ children, variant = "surface", className = "" }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl p-4",
        variantClass[variant],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
