"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/mobile/OtpInput";

const RESEND_SECONDS = 42;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [remaining, setRemaining] = React.useState(RESEND_SECONDS);

  React.useEffect(() => {
    if (remaining <= 0) return;
    const id = window.setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [remaining]);

  const handleComplete = React.useCallback(
    (value: string) => {
      setOtp(value);
      setSubmitting(true);
      // Simulated verify — proceed to dashboard. TODO: wrong-OTP behavior (deferred).
      window.setTimeout(() => router.push("/dashboard"), 350);
    },
    [router]
  );

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <>
      <TopBar variant="back" title="Verify OTP" backHref="/login" />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-5 py-5 overflow-y-auto">
          <h1 className="font-heading text-[22px] font-bold text-ink">
            Enter the 6-digit OTP
          </h1>
          <p className="text-[13px] text-muted mt-2 leading-relaxed">
            Sent to MH 56 M 7854 owner&apos;s mobile +91&nbsp;<span className="tnum">●●●●● 43210</span> and email r●●●●●@gmail.com.
          </p>

          <div className="mt-6">
            <OtpInput onComplete={handleComplete} autoFocus />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[13px] text-muted">
            <ClockIcon />
            {remaining > 0 ? (
              <span>
                Resend in <span className="text-ink font-semibold tnum">{mm}:{ss}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setRemaining(RESEND_SECONDS)}
                className="text-ink font-semibold underline-offset-2 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>

        <div className="px-5 pb-6 pt-3 border-t border-neutral-100">
          <Button
            type="button"
            fullWidth
            disabled={otp.length !== 6 || submitting}
            onClick={() => handleComplete(otp || "")}
          >
            {submitting ? "Verifying…" : "Verify and Continue"}
          </Button>
          <p className="text-center text-[13px] text-muted mt-3">
            Having trouble?{" "}
            <button type="button" className="text-ink font-semibold underline-offset-2 hover:underline">
              Get help
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

function ClockIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
