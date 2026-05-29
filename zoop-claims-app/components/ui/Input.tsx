import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, helper, error, leftIcon, id, className = "", ...rest }, ref) {
    const inputId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-ink"
          >
            {label}
          </label>
        ) : null}
        <div
          className={[
            "flex items-center gap-2 rounded-xl border bg-white px-3 h-12 transition-colors",
            error
              ? "border-danger-500 focus-within:border-danger-500"
              : "border-border-strong focus-within:border-ink",
          ].join(" ")}
        >
          {leftIcon ? <span className="text-muted shrink-0">{leftIcon}</span> : null}
          <input
            ref={ref}
            id={inputId}
            className={[
              "flex-1 outline-none bg-transparent text-[15px] placeholder:text-subtle text-ink",
              className,
            ].join(" ")}
            {...rest}
          />
        </div>
        {error ? (
          <p className="text-[12px] text-danger">{error}</p>
        ) : helper ? (
          <p className="text-[12px] text-muted">{helper}</p>
        ) : null}
      </div>
    );
  }
);
