import * as React from "react";
import { StatusBar } from "./StatusBar";

interface PhoneFrameProps {
  children: React.ReactNode;
}

/**
 * The 390×844 phone frame from the HTML prototype. On wider screens the page
 * background is dark (var(--color-bg)) so the phone reads as "on stage". On
 * narrow viewports (≤390px) the frame is full-bleed.
 */
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg py-0 sm:py-8">
      <div className="phone flex flex-col">
        <StatusBar />
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
