const inr = new Intl.NumberFormat("en-IN");

interface Props {
  youPay: number;
  insurerPays: number;
  /** Star/asterisk after the figures (e.g. "estimate" mode in Settlement) */
  estimateMarker?: boolean;
  /** Disclaimer copy under the row */
  disclaimer?: string;
  /** Insurer-pays label override — "INSURER PAY" vs "INSURER PAYS" */
  insurerLabel?: string;
}

export function PaymentSplit({
  youPay,
  insurerPays,
  estimateMarker,
  disclaimer,
  insurerLabel = "INSURER PAY",
}: Props) {
  const mark = estimateMarker ? "*" : "";
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
            YOU PAY
          </p>
          <p className="mt-1 font-heading text-[26px] font-bold text-brand-700 tnum">
            ₹{inr.format(youPay)}
            {mark}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
            {insurerLabel}
          </p>
          <p className="mt-1 font-heading text-[18px] font-bold text-ink tnum">
            ₹{inr.format(insurerPays)}
            {mark}
          </p>
        </div>
      </div>
      {disclaimer ? (
        <p className="mt-3 text-center text-[11px] text-muted leading-relaxed">{disclaimer}</p>
      ) : null}
    </div>
  );
}
