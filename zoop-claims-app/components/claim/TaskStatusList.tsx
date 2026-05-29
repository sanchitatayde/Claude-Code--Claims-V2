import type { TaskStatusItem } from "@/lib/types";

interface Props {
  items: TaskStatusItem[];
}

/**
 * Single-line list (used on REGISTERED detail): each row has a colored dot
 * (orange = pending, green = submitted), title, meta, and a trailing icon
 * (upload arrow for pending, eye for submitted).
 */
export function TaskStatusList({ items }: Props) {
  return (
    <ul className="rounded-2xl border border-border bg-white overflow-hidden">
      {items.map((it, i) => (
        <li
          key={it.id}
          className={i > 0 ? "border-t border-neutral-100" : undefined}
        >
          <button
            // TODO: tap destination per task (deferred per user)
            type="button"
            className="w-full flex items-center gap-3 p-3 text-left hover:bg-surface-alt transition-colors"
          >
            <span
              aria-hidden
              className={[
                "h-2 w-2 rounded-full shrink-0",
                it.state === "submitted" ? "bg-brand-500" : "bg-warn",
              ].join(" ")}
            />
            <span className="flex-1 min-w-0">
              <span className="block font-heading text-[14px] font-semibold leading-tight">
                {it.title}
              </span>
              <span className="block text-[12px] text-muted mt-0.5 truncate">{it.meta}</span>
            </span>
            <span className="text-muted shrink-0">
              {it.state === "submitted" ? <EyeIcon /> : <UploadIcon />}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function EyeIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
