import Link from "next/link";
import type { HelpClaimContext } from "@/lib/types";

interface Props {
  claim: HelpClaimContext;
  /** Show the "Change" link to go back to /help/pick-claim */
  showChange?: boolean;
}

/** Banner used at the top of /help/issues and /help/issues/[id] — insurer
 *  monogram, claim no., vehicle, stage, and an optional Change link. */
export function HelpClaimHeader({ claim, showChange = true }: Props) {
  return (
    <div className="bg-white border-b border-border-strong px-5 py-3 flex items-center gap-3">
      <span className="h-10 w-10 rounded-lg bg-ink text-white inline-flex items-center justify-center text-[11px] font-bold tracking-wider" aria-hidden>
        {claim.insurerCode}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-heading text-[14px] font-bold leading-tight">
          {claim.shortId} · <span className="font-semibold">{claim.vehicle}</span>
        </p>
        <p className="text-[11px] text-muted mt-0.5">
          Stage: {claim.stage} · {claim.insurer}
        </p>
      </div>
      {showChange ? (
        <Link
          href="/help/pick-claim"
          className="text-[13px] font-medium text-brand-700 hover:underline shrink-0"
        >
          Change
        </Link>
      ) : null}
    </div>
  );
}
