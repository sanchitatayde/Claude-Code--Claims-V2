import type { ClaimSummary } from "@/lib/types";
import { getClosedDetail } from "@/lib/mock-data";
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

export function ClosedDetail({ claim }: Props) {
  const D = getClosedDetail(claim);
  return (
    <>
      <VehicleBanner claim={claim} />

      <div className="bg-brand-50 px-5 pb-5">
        <p className="font-heading text-[28px] font-bold text-ink tnum">
          ₹{inr.format(D.approvedAmount)} <span className="text-[20px] font-bold">approved</span>
        </p>
        <p className="mt-1 text-[12px] text-muted">
          Settled on {D.settledOn} · Closed in {D.closedIn}
        </p>
      </div>

      <div className="px-5 py-5 space-y-5">
        <section>
          <h2 className="font-heading text-[18px] font-bold">Final Invoice</h2>
          <div className="mt-3">
            <PaymentSplit
              youPay={D.youPay}
              insurerPays={D.approvedAmount}
              insurerLabel="INSURER PAYS"
            />
          </div>
        </section>

        <ReportsList reports={D.reports} />

        <Timeline steps={D.timeline} />
        <DocsAndPhotos />
        <ClaimFooter />
      </div>
    </>
  );
}
