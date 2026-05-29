"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import {
  getHelpClaim,
  SUPPORT_CHAT_FAQS,
} from "@/lib/mock-data";
import type { ChatFaq, HelpClaimContext } from "@/lib/types";

/* ---------- conversation model ---------- */

type Turn =
  | { kind: "intro"; ts: string }
  | { kind: "user"; text: string; ts: string }
  | { kind: "system-text"; text: string; ts: string }
  | {
      kind: "system-card";
      headline: string;
      rows: { label: string; value: string }[];
      ts: string;
      /** Whether to show "View FAQ menu" button + "Was this helpful?" below. */
      withFollowUp?: boolean;
    }
  | { kind: "menu"; faqs: ChatFaq[] }
  | { kind: "fallback-menu" };

const NOW = "10:43 AM";   // static timestamps — prototype only

export default function ChatPage() {
  return (
    <React.Suspense
      fallback={
        <TopBar variant="back" title="Claims Helpdesk" sub="Online" backHref="/help" />
      }
    >
      <ChatContent />
    </React.Suspense>
  );
}

function ChatContent() {
  const router = useRouter();
  const search = useSearchParams();
  const claim = getHelpClaim(search.get("claim"));

  const [turns, setTurns] = React.useState<Turn[]>(() => [
    { kind: "intro", ts: "10:42 AM" },
    { kind: "menu", faqs: SUPPORT_CHAT_FAQS },
  ]);

  /** True until the first user pick; controls the "Claire for …" vs "Helpdesk" title. */
  const isFresh = !turns.some((t) => t.kind === "user");

  // Auto-scroll the chat surface to the bottom whenever a new turn arrives.
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [turns]);

  function appendUserTurn(text: string, replies: Turn[]) {
    setTurns((prev) => [
      ...prev,
      { kind: "user", text, ts: NOW },
      ...replies,
    ]);
  }

  function handleFaq(faq: ChatFaq) {
    const replies: Turn[] = [];
    if (faq.response.intro) {
      replies.push({ kind: "system-text", text: faq.response.intro, ts: NOW });
    }
    if (faq.response.card) {
      replies.push({
        kind: "system-card",
        headline: faq.response.card.headline,
        rows: faq.response.card.rows,
        ts: NOW,
        withFollowUp: true,
      });
    }
    appendUserTurn(faq.label, replies);
  }

  function handleMoreQuestions() {
    appendUserTurn("More questions", [
      { kind: "system-text", text: "Select an option", ts: NOW },
      { kind: "fallback-menu" },
    ]);
  }

  function handleViewFaqMenu() {
    appendUserTurn("I have more doubts", [
      { kind: "system-text", text: "Select an option", ts: NOW },
      { kind: "menu", faqs: SUPPORT_CHAT_FAQS },
    ]);
  }

  function handleChatWithSupport() {
    const qp = claim.shortId ? `?claim=${claim.shortId}` : "";
    router.push(`/help/chat/connecting${qp}`);
  }

  function handleClose() {
    router.push("/help");
  }

  return (
    <>
      <TopBar
        variant="back"
        backHref="/help"
        title={isFresh ? `Claire for ${claim.shortId}` : "Claims Helpdesk"}
        sub="● Online"
        rightSlot={<ClaimContextChip claim={claim} />}
      />

      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto bg-white"
      >
        <div className="px-4 py-4 space-y-3">
          {turns.map((t, i) => (
            <TurnView
              key={i}
              turn={t}
              claim={claim}
              onFaq={handleFaq}
              onMoreQuestions={handleMoreQuestions}
              onViewFaqMenu={handleViewFaqMenu}
              onChatWithSupport={handleChatWithSupport}
              onClose={handleClose}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- subcomponents ---------- */

function ClaimContextChip({ claim }: { claim: HelpClaimContext }) {
  return (
    <div className="text-right leading-tight">
      <div className="text-[12px] text-muted">{claim.vehicle}</div>
      <div className="text-[12px] text-muted tnum">{claim.regNo}</div>
    </div>
  );
}

interface TurnViewProps {
  turn: Turn;
  claim: HelpClaimContext;
  onFaq: (f: ChatFaq) => void;
  onMoreQuestions: () => void;
  onViewFaqMenu: () => void;
  onChatWithSupport: () => void;
  onClose: () => void;
}

function TurnView({
  turn,
  claim,
  onFaq,
  onMoreQuestions,
  onViewFaqMenu,
  onChatWithSupport,
  onClose,
}: TurnViewProps) {
  switch (turn.kind) {
    case "intro":
      return (
        <SystemBubble ts={turn.ts}>
          <p>
            Hi Sanchita <span aria-hidden>👋</span>
          </p>
          <p className="mt-1">
            I&apos;m Claire, your claims assistant. I can answer most questions about claim{" "}
            <span className="font-semibold">{claim.shortId}</span> in seconds.
          </p>
        </SystemBubble>
      );

    case "user":
      return <UserBubble text={turn.text} ts={turn.ts} />;

    case "system-text":
      return <SystemBubble ts={turn.ts}><p>{turn.text}</p></SystemBubble>;

    case "system-card":
      return (
        <SystemBubble ts={turn.ts}>
          <p className="font-semibold text-ink">{turn.headline}</p>
          <div className="mt-3 rounded-xl bg-white border border-border p-3 space-y-1.5">
            {turn.rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-[13px]">
                <span className="text-muted">{r.label}</span>
                <span className="text-ink font-semibold tnum">{r.value}</span>
              </div>
            ))}
          </div>
          {turn.withFollowUp ? (
            <div className="mt-3 -mx-3 -mb-3 rounded-b-2xl">
              <button
                type="button"
                onClick={onViewFaqMenu}
                className="w-full flex items-center gap-2 px-3 py-3 border-t border-border text-[13px] font-semibold text-ink hover:bg-surface-alt"
              >
                <Sparkle />
                <span className="flex-1 text-left">View FAQ menu</span>
                <Chevron />
              </button>
            </div>
          ) : null}
          {turn.withFollowUp ? <Helpful /> : null}
        </SystemBubble>
      );

    case "menu":
      return (
        <ul className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
          {turn.faqs.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => (f.id === "more" ? onMoreQuestions() : onFaq(f))}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-alt"
              >
                <Sparkle />
                <span className="flex-1 font-semibold text-[13px] text-ink">{f.label}</span>
                <Chevron />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onMoreQuestions}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-alt"
            >
              <Sparkle />
              <span className="flex-1 font-semibold text-[13px] text-ink">More questions</span>
              <Chevron />
            </button>
          </li>
        </ul>
      );

    case "fallback-menu":
      return (
        <ul className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
          <li>
            <button
              type="button"
              onClick={onChatWithSupport}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-alt"
            >
              <Sparkle />
              <span className="flex-1 font-semibold text-[13px] text-ink">Chat with Support</span>
              <Chevron />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-alt"
            >
              <Sparkle />
              <span className="flex-1 font-semibold text-[13px] text-ink">Close</span>
              <Chevron />
            </button>
          </li>
        </ul>
      );
  }
}

function UserBubble({ text, ts }: { text: string; ts: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%]">
        <div className="rounded-2xl bg-brand-50 text-ink px-4 py-2.5 text-[14px] leading-snug">
          {text}
        </div>
        <div className="mt-1 text-right text-[11px] text-muted tnum">{ts}</div>
      </div>
    </div>
  );
}

function SystemBubble({ ts, children }: { ts: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%]">
        <div className="rounded-2xl bg-surface-alt text-ink px-4 py-3 text-[14px] leading-snug">
          {children}
        </div>
        <div className="mt-1 text-[11px] text-muted tnum">{ts}</div>
      </div>
    </div>
  );
}

function Helpful() {
  // Local UI-only state for the prototype.
  const [vote, setVote] = React.useState<"up" | "down" | null>(null);
  return (
    <div className="mt-3 -mx-3 -mb-3 border-t border-border px-3 py-3 flex items-center gap-2 text-[12px] text-muted">
      <span>Was this helpful?</span>
      <button
        type="button"
        onClick={() => setVote("up")}
        className={[
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[12px]",
          vote === "up"
            ? "bg-brand-50 text-brand-700 border-brand-500"
            : "bg-white text-ink border-border hover:bg-surface-alt",
        ].join(" ")}
      >
        <ThumbsUp />
        <span className="font-semibold">Yes</span>
      </button>
      <button
        type="button"
        onClick={() => setVote("down")}
        className={[
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[12px]",
          vote === "down"
            ? "bg-danger-50 text-danger border-danger-500"
            : "bg-white text-ink border-border hover:bg-surface-alt",
        ].join(" ")}
      >
        <ThumbsDown />
        <span className="font-semibold">No</span>
      </button>
    </div>
  );
}

/* ---------- icons ---------- */

function Sparkle() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="text-subtle shrink-0" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-subtle shrink-0" aria-hidden>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}
function ThumbsUp() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
function ThumbsDown() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zM17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}
