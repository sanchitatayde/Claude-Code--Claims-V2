import type { ClaimSummary } from "@/lib/types";
import { getInvestigationDetail } from "@/lib/mock-data";
import { VehicleBanner } from "../VehicleBanner";
import { Timeline } from "../Timeline";
import { OpenTasksList } from "../OpenTasksList";
import { DocsAndPhotos } from "../DocsAndPhotos";
import { ClaimFooter } from "../ChatButton";

interface Props {
  claim: ClaimSummary;
}

export function InvestigationDetail({ claim }: Props) {
  const D = getInvestigationDetail(claim);
  return (
    <>
      <VehicleBanner claim={claim} />
      <div className="px-5 py-5 space-y-5">
        {/* Surveyor visit notice */}
        <section className="rounded-2xl border border-border bg-white p-4">
          <p className="flex items-center gap-2 text-[12px] text-muted">
            <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden />
            <span className="tnum">{D.surveyor.timestamp}</span>
          </p>
          <h2 className="mt-2 font-heading text-[18px] font-bold leading-snug">
            {D.surveyor.title}
          </h2>
          <p className="mt-1 text-[13px] text-muted leading-relaxed">
            {D.surveyor.body}
          </p>
        </section>

        <OpenTasksList tasks={D.openTasks} />
        <Timeline steps={D.timeline} />
        <DocsAndPhotos />
        <ClaimFooter />
      </div>
    </>
  );
}
