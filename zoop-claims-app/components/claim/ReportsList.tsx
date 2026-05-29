import type { ReportFile } from "@/lib/types";

interface Props {
  reports: ReportFile[];
}

export function ReportsList({ reports }: Props) {
  return (
    <section>
      <h2 className="font-heading text-[18px] font-bold">Reports</h2>
      <ul className="mt-3 space-y-2">
        {reports.map((r) => (
          <li key={r.name}>
            <button
              // TODO: download report (deferred per user)
              type="button"
              className="w-full flex items-center gap-3 rounded-2xl border border-border bg-white p-3 hover:bg-surface-alt transition-colors text-left"
            >
              <span
                className={[
                  "h-10 w-10 rounded-lg inline-flex items-center justify-center shrink-0",
                  iconBg(r.variant),
                ].join(" ")}
                aria-hidden
              >
                <ReportIcon variant={r.variant} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-heading text-[14px] font-semibold leading-tight">
                  {r.name}
                </span>
                <span className="block text-[12px] text-muted mt-0.5">
                  {r.format} · {r.size}
                </span>
              </span>
              <span className="text-muted shrink-0">
                <DownloadIcon />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function iconBg(variant?: ReportFile["variant"]) {
  if (variant === "settlement") return "bg-warn-100 text-warn";
  if (variant === "invoice") return "bg-brand-50 text-brand-700";
  return "bg-brand-50 text-brand-700";
}

function ReportIcon({ variant }: { variant?: ReportFile["variant"] }) {
  if (variant === "settlement") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (variant === "invoice") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <line x1="7" y1="9" x2="17" y2="9" />
        <line x1="7" y1="13" x2="13" y2="13" />
      </svg>
    );
  }
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
