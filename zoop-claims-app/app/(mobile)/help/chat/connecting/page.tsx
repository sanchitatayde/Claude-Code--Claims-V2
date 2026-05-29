"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { Button } from "@/components/ui/Button";
import { getHelpClaim } from "@/lib/mock-data";
import type { HelpClaimContext } from "@/lib/types";

export default function ConnectingPage() {
  return (
    <React.Suspense
      fallback={
        <TopBar variant="back" title="Connecting to an agent…" sub="● Online" backHref="/help/chat" />
      }
    >
      <ConnectingContent />
    </React.Suspense>
  );
}

function ConnectingContent() {
  const router = useRouter();
  const search = useSearchParams();
  const claim = getHelpClaim(search.get("claim"));

  return (
    <>
      <TopBar
        variant="back"
        backHref="/help/chat"
        title="Connecting to an agent…"
        sub="● Online"
        rightSlot={<ClaimContextChip claim={claim} />}
      />

      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 px-5 flex flex-col items-center justify-center text-center">
          <RingPulse />
          <h2 className="mt-8 font-heading text-[22px] font-bold text-ink">
            You&apos;re #3 in queue
          </h2>
          <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-[280px]">
            A specialist will join you in ~2 min. We&apos;ve shared your claim details with them.
          </p>

          {/* Step list */}
          <ul className="mt-8 space-y-3 text-left w-full max-w-[280px]">
            <Step state="done" label="Request placed" />
            <Step state="done" label="Sharing claim context with agent" />
            <Step state="pending" label="Agent joining…" />
          </ul>
        </div>

        <div className="px-5 pb-6 pt-3">
          <Button type="button" variant="outline" fullWidth onClick={() => router.push("/help/chat")}>
            Go Back
          </Button>
        </div>
      </div>
    </>
  );
}

function ClaimContextChip({ claim }: { claim: HelpClaimContext }) {
  return (
    <div className="text-right leading-tight">
      <div className="text-[12px] text-muted">{claim.vehicle}</div>
      <div className="text-[12px] text-muted tnum">{claim.regNo}</div>
    </div>
  );
}

function RingPulse() {
  return (
    <div className="relative h-32 w-32 inline-flex items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-brand-50/70 animate-ping" aria-hidden />
      <span className="absolute inset-3 rounded-full bg-brand-50" aria-hidden />
      <span className="relative h-16 w-16 rounded-full bg-brand-500 inline-flex items-center justify-center text-white" aria-hidden>
        <HeadsetIcon />
      </span>
    </div>
  );
}

function Step({ state, label }: { state: "done" | "pending"; label: string }) {
  return (
    <li className="flex items-center gap-3">
      {state === "done" ? (
        <span className="h-5 w-5 rounded-full bg-brand-700 inline-flex items-center justify-center text-white shrink-0" aria-hidden>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      ) : (
        <span className="h-5 w-5 rounded-full bg-neutral-200 inline-block shrink-0" aria-hidden />
      )}
      <span
        className={[
          "text-[14px]",
          state === "done" ? "text-ink font-semibold" : "text-muted",
        ].join(" ")}
      >
        {label}
      </span>
    </li>
  );
}

function HeadsetIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-2v-7h4z" />
      <path d="M3 19a2 2 0 0 0 2 2h2v-7H3z" />
    </svg>
  );
}
