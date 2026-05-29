import type { OpenTask } from "@/lib/types";

interface Props {
  tasks: OpenTask[];
}

export function OpenTasksList({ tasks }: Props) {
  return (
    <section>
      <h2 className="font-heading text-[18px] font-bold flex items-center gap-2">
        Open Tasks
        <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-surface-alt text-[11px] font-semibold text-ink">
          {tasks.length}
        </span>
      </h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((t) => (
          <li key={t.id}>
            <OpenTaskCard task={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function OpenTaskCard({ task }: { task: OpenTask }) {
  const isAction = task.variant === "action";
  return (
    <button
      // TODO: open-task destination (deferred per user)
      type="button"
      className={[
        "w-full flex items-center gap-3 p-3 text-left rounded-2xl border transition-colors",
        isAction
          ? "bg-warn-50 border-warn-100 hover:bg-warn-100/60"
          : "bg-white border-border hover:bg-surface-alt",
      ].join(" ")}
    >
      <span
        className={[
          "h-10 w-10 rounded-lg inline-flex items-center justify-center shrink-0",
          isAction ? "bg-warn-100 text-warn" : "bg-surface-alt text-muted",
        ].join(" ")}
        aria-hidden
      >
        {task.icon === "doc" ? <DocIcon /> : <PhotoIcon />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-heading text-[14px] font-semibold leading-tight">
          {task.title}
        </span>
        <span className="block text-[12px] text-muted mt-0.5 truncate">{task.meta}</span>
      </span>

      {task.trailing === "badge" && task.badge ? (
        <span className="shrink-0 inline-flex items-center rounded-md bg-warn-100 text-warn px-2 py-0.5 text-[11px] font-semibold">
          {task.badge}
        </span>
      ) : task.trailing === "upload" ? (
        <span className="shrink-0 text-muted">
          <UploadIcon />
        </span>
      ) : null}
    </button>
  );
}

function DocIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function PhotoIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
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
