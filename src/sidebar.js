// Find the VISIBLE Support (?) anchor in Gmail's toolbar.
// Gmail has multiple a[aria-label="Support"] elements — the first in DOM order
// is hidden/offscreen (top ~1352px). We need the one actually in the toolbar
// (visible, near top of viewport). Poll until found or timeout.
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
    zIndex: '9999',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    overflowY: 'auto',
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
  });

  const toggle = document.createElement('div');
  toggle.id = 'gmail-intel-toggle';
  Object.assign(toggle.style, {
    position: 'fixed',
    zIndex: '10000',
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
    top: '-100px', // offscreen until positioned
    right: '0',
  });
  toggle.title = 'Gmail Intel';
  toggle.textContent = '📊';

  toggle.addEventListener('mouseover', () => { toggle.style.background = 'rgba(32,33,36,0.08)'; });
  toggle.addEventListener('mouseout',  () => { toggle.style.background = 'transparent'; });

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === 'translateX(0)';
    sidebar.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0)';
  });

  document.body.appendChild(sidebar);
  document.body.appendChild(toggle);

  // findVisibleToolbarAnchor already guarantees the element has real dimensions
  // and is in the toolbar area, so we can read its rect immediately on resolve.
  findVisibleToolbarAnchor().then((anchor) => {
    const applyPosition = () => {
      const r = anchor.getBoundingClientRect();
      toggle.style.top   = Math.round(r.top + (r.height - 40) / 2) + 'px';
      toggle.style.right = (window.innerWidth - r.left + 4) + 'px';
    };
    applyPosition();
    window.addEventListener('resize', applyPosition);
  }).catch(() => {
    // Fallback: visible blue floating button
    Object.assign(toggle.style, {
      top: 'auto',
      bottom: '80px',
      right: '16px',
      background: '#1a73e8',
      color: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    });
  });

  return sidebar;
}
