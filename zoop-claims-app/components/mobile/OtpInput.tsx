"use client";

import * as React from "react";

interface Props {
  length?: number;
  onComplete: (value: string) => void;
  autoFocus?: boolean;
}

export function OtpInput({ length = 6, onComplete, autoFocus }: Props) {
  const [values, setValues] = React.useState<string[]>(() => Array(length).fill(""));
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  const setAt = (i: number, v: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      // auto-submit when complete
      if (next.every((c) => c.length === 1)) {
        // defer so React commits state before parent navigates
        queueMicrotask(() => onComplete(next.join("")));
      }
      return next;
    });
  };

  const onChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setAt(i, "");
      return;
    }
    // Handle paste of full code
    if (raw.length > 1) {
      const chars = raw.slice(0, length).split("");
      setValues((prev) => {
        const next = [...prev];
        chars.forEach((c, idx) => {
          if (i + idx < length) next[i + idx] = c;
        });
        if (next.every((c) => c.length === 1)) {
          queueMicrotask(() => onComplete(next.join("")));
        }
        return next;
      });
      const focusIdx = Math.min(i + chars.length, length - 1);
      inputsRef.current[focusIdx]?.focus();
      return;
    }
    setAt(i, raw);
    if (i < length - 1) inputsRef.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1) inputsRef.current[i + 1]?.focus();
  };

  return (
    <div className="flex items-center gap-2 tnum">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label={`Digit ${i + 1}`}
          maxLength={length} // allow paste, we slice
          value={v}
          onChange={onChange(i)}
          onKeyDown={onKeyDown(i)}
          className="h-14 w-12 text-center text-[22px] font-semibold rounded-xl border-2 border-border-strong bg-white focus:border-ink outline-none"
        />
      ))}
    </div>
  );
}
