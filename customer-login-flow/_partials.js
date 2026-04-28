// Shared chrome injectors so each screen file stays compact.
window.injectChrome = function (opts = {}) {
  const brand = opts.brand || 'Zoop.one';
  const sub = opts.sub || 'Claims Registration Form';
  const showHelp = opts.help !== false;
  const backHref = opts.back || null;

  const phone = document.querySelector('.phone');
  if (!phone) return;

  // Status bar
  const sb = document.createElement('div');
  sb.className = 'statusbar';
  sb.innerHTML = `
    <span>9:41</span>
    <div class="icons">
      <svg viewBox="0 0 18 11" fill="currentColor"><rect x="0" y="6" width="3" height="5" rx="0.5"/><rect x="5" y="4" width="3" height="7" rx="0.5"/><rect x="10" y="2" width="3" height="9" rx="0.5"/><rect x="15" y="0" width="3" height="11" rx="0.5"/></svg>
      <svg viewBox="0 0 16 11" fill="currentColor"><path d="M8 11C5.5 8.5 4 7.5 4 6C4 4.5 5.5 3 8 3s4 1.5 4 3-1.5 2.5-4 5z" opacity=".3"/><path d="M8 0a10 10 0 0 1 7 2.5l-1.5 1.5A8 8 0 0 0 8 2 8 8 0 0 0 2.5 4L1 2.5A10 10 0 0 1 8 0z"/></svg>
      <svg viewBox="0 0 24 11" fill="none" stroke="currentColor" stroke-width="1"><rect x="0.5" y="0.5" width="20" height="10" rx="2"/><rect x="2" y="2" width="17" height="7" rx="1" fill="currentColor"/><rect x="21" y="3" width="2" height="5" fill="currentColor" opacity="0.6"/></svg>
    </div>
  `;
  phone.prepend(sb);

  // Brand bar — sits directly under status bar
  const bb = document.createElement('div');
  bb.className = 'brand-bar';
  const backEl = backHref
    ? `<a href="${backHref}" class="back-btn" aria-label="Back">
         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
       </a>`
    : `<span class="back-btn back-btn--placeholder" aria-hidden="true"></span>`;

  bb.innerHTML = `
    ${backEl}
    <div class="brand-logo">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="40" height="40" rx="10" fill="#0a0a0a"/>
        <path d="M11 14 L19 14 L11 26 L19 26" stroke="#5cf3a4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M22 14 L28 20 L22 26" stroke="#5cf3a4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </div>
    <div class="brand-text">
      <div class="brand-name">${brand}</div>
      <div class="brand-sub">${sub}</div>
    </div>
    ${showHelp ? `<a href="javascript:void(0)" class="brand-help" title="Help" aria-label="Help">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></svg>
    </a>` : ''}
  `;
  // Insert directly after status bar (not at the bottom of phone)
  sb.insertAdjacentElement('afterend', bb);
};

window.injectFooter = function (button) {
  const phone = document.querySelector('.phone');
  if (!phone) return;
  const f = document.createElement('div');
  f.className = 'footer';
  f.innerHTML = `
    ${button || ''}
    <div class="powered">Powered by <span class="zoop-logo">ZO<span style="color:#00c266">●</span>P</span></div>
  `;
  phone.appendChild(f);
};
