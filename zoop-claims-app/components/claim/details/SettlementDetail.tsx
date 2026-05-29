import type { ClaimSummary } from "@/lib/types";
import { getSettlementDetail } from "@/lib/mock-data";
import { VehicleBanner } from "../VehicleBanner";
import { Timeline } from "../Timeline";
import { ReportsList } from "../ReportsList";
import { PaymentSplit } from "../PaymentSplit";
import { DocsAndPhotos } from "../DocsAndPhotos";
import { ClaimFooter } from "../ChatButton";

const inr = new Intl.NumberFormat("en-IN");

interface Props {
  claim: ClaimSummary;
}

export function SettlementDetail({ claim }: Props) {
  const D = getSettlementDetail(claim);
  return (
    <>
      <VehicleBanner claim={claim} />

      {/* Big approved amount on tinted background */}
      <div className="bg-brand-50 px-5 pb-5">
        <p className="font-heading text-[28px] font-bold text-ink tnum">
          ₹{inr.format(D.approvedAmount)} <span className="text-[20px] font-bold">approved</span>
        </p>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Ongoing Repair card */}
        <section className="rounded-2xl border border-border bg-white p-4">
          <p className="flex items-center gap-2 text-[12px] text-muted">
            <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden />
            <span className="tnum">{D.ongoingRepair.timestamp}</span>
          </p>
          <h2 className="mt-2 font-heading text-[18px] font-bold leading-snug">
            {D.ongoingRepair.title}
          </h2>
          <p className="mt-1 text-[13px] text-muted leading-relaxed">
            {D.ongoingRepair.body}
          </p>
          <button
            // TODO: View Photos destination (deferred per user)
            type="button"
            className="mt-3 inline-flex items-center justify-center h-10 px-4 rounded-xl bg-black text-white text-[13px] font-medium hover:bg-neutral-900 transition-colors"
          >
            {D.ongoingRepair.cta}
          </button>
        </section>

        <ReportsList reports={D.reports} />

        <section>
          <h2 className="font-heading text-[18px] font-bold">Estimate Approved</h2>
          <div className="mt-3">
            <PaymentSplit
              youPay={D.youPay}
              insurerPays={D.approvedAmount}
              estimateMarker
              disclaimer="*These are estimates — your final invoice will be based on the actual repair work."
            />
          </div>
        </section>

        <Timeline steps={D.timeline} />
        <DocsAndPhotos />
        <ClaimFooter />
      </div>
    </>
  );
}
