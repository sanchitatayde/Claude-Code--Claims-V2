import { DOCS_AND_PHOTOS } from "@/lib/mock-data";

/**
 * Single combined "Documents & Photos" section — 4 thumbnails in a row, last
 * shows "+N" overflow. Matches the new status-specific detail pages.
 */
export function DocsAndPhotos() {
  return (
    <section>
      <h2 className="font-heading text-[18px] font-bold">Documents &amp; Photos</h2>
      <ul className="mt-3 grid grid-cols-4 gap-2">
        {DOCS_AND_PHOTOS.labels.map((label, i) => {
          const isOverflow = label.startsWith("+");
          return (
            <li key={i}>
              <button
                // TODO: gallery viewer (deferred per user)
                type="button"
                className="relative block w-full aspect-square rounded-lg bg-neutral-300 overflow-hidden hover:opacity-90 transition-opacity"
                aria-label={isOverflow ? `Show ${label}` : "View damage photo"}
              >
                {isOverflow ? (
                  <span className="absolute inset-0 inline-flex items-center justify-center text-white font-heading text-[15px] font-bold bg-black/60">
                    {label}
                  </span>
                ) : (
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium">
                    {label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
