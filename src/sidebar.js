// Find the VISIBLE Support (?) anchor in Gmail's toolbar.
// Gmail has multiple a[aria-label="Support"] elements — the first in DOM order
// is hidden/offscreen. We need the one actually in the toolbar (top < 150px).
function findVisibleToolbarAnchor(timeoutMs = 10000) {
  const selectors = [
    'a[aria-label="Support"]',
    'div[data-tooltip="Support"]',
    'a[aria-label^="Setting"]',
    'div[data-tooltip^="Setting"]',
  ];

  const findVisible = () => {
    for (const sel of selectors) {
      for (const el of document.querySelectorAll(sel)) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.top >= 0 && r.top < 150) return el;
      }
    }
    return null;
  };

  return new Promise((resolve, reject) => {
    const el = findVisible();
    if (el) { resolve(el); return; }
    const deadline = Date.now() + timeoutMs;
    const poll = setInterval(() => {
      const el = findVisible();
      if (el) { clearInterval(poll); resolve(el); return; }
      if (Date.now() > deadline) { clearInterval(poll); reject(); }
    }, 100);
  });
}

export function initSidebar() {
  const sidebar = document.createElement('div');
  sidebar.id = 'gmail-intel-sidebar';
  Object.assign(sidebar.style, {
    position: 'fixed',
    top: '0',
    right: '0',
    height: '100vh',
    width: '360px',
    background: '#fff',
    boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
    zIndex: '2147483647',        // max z-index — overlays Gmail's own toolbar
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    overflowY: 'auto',
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
  });

  // Close button (X) in upper-right of sidebar
  const closeBtn = document.createElement('button');
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#5f6368',
    lineHeight: '1',
    padding: '4px',
    zIndex: '1',
  });
  closeBtn.textContent = '✕';
  closeBtn.title = 'Close';
  sidebar.appendChild(closeBtn);

  const toggle = document.createElement('div');
  toggle.id = 'gmail-intel-toggle';
  Object.assign(toggle.style, {
    position: 'fixed',
    zIndex: '2147483646',        // just below sidebar
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',
    background: 'transparent',
    transition: 'background 0.15s',
    top: '-100px',               // offscreen until positioned
    left: '0',
  });
  toggle.title = 'Gmail Intel';
  toggle.textContent = '📊';

  toggle.addEventListener('mouseover', () => { toggle.style.background = 'rgba(32,33,36,0.08)'; });
  toggle.addEventListener('mouseout',  () => { toggle.style.background = 'transparent'; });

  const openSidebar  = () => { sidebar.style.transform = 'translateX(0)'; };
  const closeSidebar = () => { sidebar.style.transform = 'translateX(100%)'; };
  const isOpen = () => sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === 'translateX(0)';

  toggle.addEventListener('click', () => isOpen() ? closeSidebar() : openSidebar());
  closeBtn.addEventListener('click', closeSidebar);

  // Escape key closes the sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeSidebar();
  });

  document.body.appendChild(sidebar);
  document.body.appendChild(toggle);

  findVisibleToolbarAnchor().then((anchor) => {
    const applyPosition = () => {
      const r = anchor.getBoundingClientRect();
      // Vertically centred on the anchor.
      // Horizontally: toggle's right edge sits 8px left of the anchor's left edge.
      toggle.style.top  = Math.round(r.top + (r.height - 40) / 2) + 'px';
      toggle.style.left = (r.left - 40 - 8) + 'px';
    };
    applyPosition();
    window.addEventListener('resize', applyPosition);
  }).catch(() => {
    // Fallback: visible blue floating button
    Object.assign(toggle.style, {
      top: 'auto',
      left: 'auto',
      bottom: '80px',
      right: '16px',
      background: '#1a73e8',
      color: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    });
  });

  return sidebar;
}
