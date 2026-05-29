import { TopBar } from "@/components/mobile/TopBar";

export default function SupportPage() {
  return (
    <>
      <TopBar variant="back" title="Support" backHref="/dashboard" />
      <div className="flex-1 px-5 py-5 overflow-y-auto bg-white">
        <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted">/support</p>
        <h1 className="font-heading text-[22px] font-bold mt-2">24×7 chat service</h1>
        <p className="text-[14px] text-muted mt-1">
          Stub — filled when you share the Support screen.
        </p>
      </div>
    </>
  );
}
