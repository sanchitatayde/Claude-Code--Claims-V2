import { TopBar } from "@/components/mobile/TopBar";
import { getClaimByShortId } from "@/lib/mock-data";
import { ChatButton } from "@/components/claim/ChatButton";
import { InvestigationDetail } from "@/components/claim/details/InvestigationDetail";
import { RegisteredDetail } from "@/components/claim/details/RegisteredDetail";
import { SettlementDetail } from "@/components/claim/details/SettlementDetail";
import { ClosedDetail } from "@/components/claim/details/ClosedDetail";
import { RepudiatedDetail } from "@/components/claim/details/RepudiatedDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimStatusPage({ params }: PageProps) {
  const { id } = await params;
  const claim = getClaimByShortId(id);

  return (
    <>
      <TopBar
        variant="back"
        title={claim.shortId}
        sub="Claim Status"
        backHref="/dashboard"
        rightSlot={<ChatButton />}
      />

      <div className="flex-1 overflow-y-auto bg-surface-alt">
        {renderForStatus(claim)}
      </div>
    </>
  );
}

function renderForStatus(claim: ReturnType<typeof getClaimByShortId>) {
  switch (claim.status) {
    case "REGISTERED":
      return <RegisteredDetail claim={claim} />;
    case "UNDER INVESTIGATION":
      return <InvestigationDetail claim={claim} />;
    case "UNDER SETTLEMENT":
      return <SettlementDetail claim={claim} />;
    case "CLOSED":
      return <ClosedDetail claim={claim} />;
    case "REPUDIATED":
      return <RepudiatedDetail claim={claim} />;
    default:
      // Defensive — should be unreachable given ClaimStatusKey is closed
      return <RegisteredDetail claim={claim} />;
  }
}
