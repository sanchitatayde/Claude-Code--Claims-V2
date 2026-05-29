import type { ClaimStatusKey, ClaimSummary } from "@/lib/types";

const EYEBROW_TONE: Record<ClaimStatusKey, string> = {
  REGISTERED: "text-brand-700",
  "UNDER INVESTIGATION": "text-brand-700",
  "UNDER SETTLEMENT": "text-brand-700",
  REPUDIATED: "text-danger",
  CLOSED: "text-brand-700",
};

function displayVehicle(name: string) {
  return name.replace(/\s+Lxi$|\s+Vxi$/i, "");
}

function displayReg(reg: string) {
  return reg.replace(/-/g, " ");
}

interface Props {
  claim: ClaimSummary;
}

export function VehicleBanner({ claim }: Props) {
  return (
    <header className="bg-brand-50 px-5 py-4 border-b border-brand-100">
      <div className="flex items-center gap-2">
        <span className="font-heading text-[18px] font-bold leading-tight">
          {displayVehicle(claim.vehicle)}
        </span>
        <span className="text-muted text-[14px]">·</span>
        <span className="font-mono text-[14px] text-ink tnum">{displayReg(claim.regNumber)}</span>
        <button
          // TODO: info icon destination (deferred per user)
          aria-label="More info"
          className="inline-flex h-6 w-6 items-center justify-center text-muted"
        >
          <InfoIcon />
        </button>
      </div>
      <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.18em] font-semibold ${EYEBROW_TONE[claim.status]}`}>
        {claim.status}
      </p>
    </header>
  );
}

function InfoIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
