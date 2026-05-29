"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "./BrandLogo";

interface BackBarProps {
  variant: "back";
  title: string;
  sub?: string;
  rightSlot?: React.ReactNode;
  backHref?: string;
  /** Swap the leading chevron for a close (✕). Default: back. */
  leadingIcon?: "back" | "close";
}

interface BrandBarProps {
  variant: "brand";
  sub?: string;
  rightSlot?: React.ReactNode;
  showHelp?: boolean;
}

interface BrandWithAvatarProps {
  variant: "brand-actions";
  rightSlot: React.ReactNode;
}

type TopBarProps = BackBarProps | BrandBarProps | BrandWithAvatarProps;

export function TopBar(props: TopBarProps) {
  const router = useRouter();

  if (props.variant === "back") {
    const isClose = props.leadingIcon === "close";
    return (
      <div className="flex items-center gap-3 px-2 pr-4 py-2 bg-white border-b border-neutral-100">
        <button
          aria-label={isClose ? "Close" : "Back"}
          onClick={() => (props.backHref ? router.push(props.backHref) : router.back())}
          className="h-11 w-11 inline-flex items-center justify-center rounded-full hover:bg-surface-alt"
        >
          {isClose ? <CloseIcon /> : <ChevronLeft />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-[16px] font-semibold leading-tight truncate">
            {props.title}
          </div>
          {props.sub ? (
            <div className="text-[12px] text-muted truncate">{props.sub}</div>
          ) : null}
        </div>
        {props.rightSlot ? <div className="shrink-0">{props.rightSlot}</div> : null}
      </div>
    );
  }

  if (props.variant === "brand-actions") {
    return (
      <div className="flex items-center gap-3 px-3 pr-4 py-2 bg-white border-b border-neutral-100">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <BrandLogo size={36} />
          <span className="font-heading text-[16px] font-semibold">Zoop.one</span>
        </Link>
        <div className="ml-auto shrink-0">{props.rightSlot}</div>
      </div>
    );
  }

  // brand
  return (
    <div className="flex items-center gap-3 px-2 pr-4 py-2 bg-white border-b border-neutral-100">
      <span className="inline-block w-11" aria-hidden />
      <div className="flex items-center gap-2.5">
        <BrandLogo size={36} />
        <div>
          <div className="font-heading text-[15px] font-semibold leading-tight">
            Zoop.one
          </div>
          {props.sub ? (
            <div className="text-[11px] text-muted">{props.sub}</div>
          ) : null}
        </div>
      </div>
      {props.showHelp !== false ? (
        <button
          aria-label="Contact support"
          className="ml-auto h-11 w-11 inline-flex items-center justify-center rounded-full text-muted hover:bg-surface-alt"
        >
          <HeadsetIcon />
        </button>
      ) : null}
      {props.rightSlot ? <div className="ml-auto shrink-0">{props.rightSlot}</div> : null}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-2v-7h4z" />
      <path d="M3 19a2 2 0 0 0 2 2h2v-7H3z" />
    </svg>
  );
}
