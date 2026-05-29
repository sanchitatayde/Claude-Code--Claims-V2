import * as React from "react";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  kbd?: string;
  fullWidth?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-neutral-900 disabled:bg-neutral-300 disabled:text-neutral-500",
  outline:
    "bg-white text-ink border border-border-strong hover:bg-surface-alt disabled:text-subtle",
  ghost: "bg-transparent text-ink hover:bg-surface-alt",
  danger: "bg-danger text-white hover:bg-red-800",
};

const sizeClass: Record<Size, string> = {
  md: "h-11 px-4 text-[14px]",
  lg: "h-14 px-5 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "lg",
  kbd,
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-brand-400 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed",
        variantClass[variant],
        sizeClass[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      <span>{children}</span>
      {kbd ? (
        <kbd
          className={[
            "rounded-md px-1.5 py-0.5 text-[10px] font-mono tracking-wide",
            variant === "primary" || variant === "danger"
              ? "bg-white/15 text-white/90"
              : "bg-neutral-100 text-muted",
          ].join(" ")}
        >
          {kbd}
        </kbd>
      ) : null}
    </button>
  );
}
