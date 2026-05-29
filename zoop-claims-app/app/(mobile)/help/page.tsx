import { TopBar } from "@/components/mobile/TopBar";

export default function HelpPage() {
  return (
    <>
      <TopBar variant="back" title="Help" backHref="/login" />
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted">
          /help
        </p>
        <h1 className="font-heading text-[22px] font-bold mt-2">Having trouble?</h1>
        <p className="text-[14px] text-muted mt-1">
          Stub — call 1800-209-3000 (24×7) and chat-with-claims-help options.
        </p>
      </div>
    </>
  );
}
