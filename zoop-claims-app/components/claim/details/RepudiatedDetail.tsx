import type { ClaimSummary } from "@/lib/types";
import { getRepudiatedDetail } from "@/lib/mock-data";
import { VehicleBanner } from "../VehicleBanner";
import { Timeline } from "../Timeline";
import { DocsAndPhotos } from "../DocsAndPhotos";
import { ClaimFooter } from "../ChatButton";

interface Props {
  claim: ClaimSummary;
}

export function RepudiatedDetail({ claim }: Props) {
  const D = getRepudiatedDetail(claim);
  return (
    <>
      <VehicleBanner claim={claim} />
      <div className="px-5 py-5 space-y-5">
        {/* Repudiation reason callout */}
        <section className="rounded-2xl border border-danger-50 bg-danger-50 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-danger font-semibold">
            REASON
          </p>
          <h2 className="mt-1 font-heading text-[18px] font-bold leading-snug text-ink">
            {D.reason}
          </h2>
          <p className="mt-2 text-[12px] text-muted leading-relaxed">
            {/* TODO: status-specific repudiation copy (deferred — no screenshot yet) */}
            Your claim has been repudiated by the insurer. If you believe this is an error,
            please contact your handler or raise a grievance.
          </p>
        </section>

        <Timeline steps={D.timeline} />
        <DocsAndPhotos />
        <ClaimFooter />
      </div>
    </>
  );
}
