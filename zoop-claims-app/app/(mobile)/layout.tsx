import * as React from "react";
import { PhoneFrame } from "@/components/mobile/PhoneFrame";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhoneFrame>{children}</PhoneFrame>;
}
