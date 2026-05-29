export function StatusBar() {
  return (
    <div className="h-[47px] px-8 pr-7 pb-3 flex items-end justify-between text-[16px] font-semibold tnum">
      <span>9:41</span>
      <div className="flex items-center gap-1.5 text-ink">
        {/* Signal */}
        <svg viewBox="0 0 18 11" fill="currentColor" className="w-[16px] h-[11px]">
          <rect x="0" y="6" width="3" height="5" rx="0.5" />
          <rect x="5" y="4" width="3" height="7" rx="0.5" />
          <rect x="10" y="2" width="3" height="9" rx="0.5" />
          <rect x="15" y="0" width="3" height="11" rx="0.5" />
        </svg>
        {/* WiFi */}
        <svg viewBox="0 0 16 11" fill="currentColor" className="w-[16px] h-[11px]">
          <path d="M8 11C5.5 8.5 4 7.5 4 6C4 4.5 5.5 3 8 3s4 1.5 4 3-1.5 2.5-4 5z" opacity="0.3" />
          <path d="M8 0a10 10 0 0 1 7 2.5l-1.5 1.5A8 8 0 0 0 8 2 8 8 0 0 0 2.5 4L1 2.5A10 10 0 0 1 8 0z" />
        </svg>
        {/* Battery */}
        <svg viewBox="0 0 24 11" fill="none" stroke="currentColor" strokeWidth={1} className="w-[24px] h-[11px]">
          <rect x="0.5" y="0.5" width="20" height="10" rx="2" />
          <rect x="2" y="2" width="17" height="7" rx="1" fill="currentColor" />
          <rect x="21" y="3" width="2" height="5" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
