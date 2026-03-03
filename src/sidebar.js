// Find Gmail's Support (?) or Settings gear icon to use as a position anchor.
// Resolves with the element when found; rejects after timeoutMs.
function findToolbarAnchor(timeoutMs = 5000) {
  const selectors = [
    'a[aria-label="Support"]',
    'div[data-tooltip="Support"]',
    'a[aria-label^="Setting"]',
    'div[data-tooltip^="Setting"]',
  ];
  const find = () => selectors.reduce((hit, sel) => hit || document.querySelector(sel), null);

  return new Promise((resolve, reject) => {
    const el = find();
    if (el) { resolve(el); return; }
    const timer = setTimeout(() => { obs.disconnect(); reject(); }, timeoutMs);
    const obs = new MutationObserver(() => {
      const el = find();
      if (el) { clearTimeout(timer); obs.disconnect(); resolve(el); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
}

// Wait until an element has non-zero layout dimensions (rAF poll).
// The MutationObserver fires when the element enters the DOM, but the
// browser may not have laid it out yet — getBoundingClientRect() returns
// all zeros until the next paint cycle completes.
function waitForLayout(el, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeoutMs;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 || r.height > 0) { resolve(el); return; }
      if (Date.now() > deadline) { reject(); return; }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
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

  // Toggle is always a fixed-positioned overlay on document.body.
  // We never inject into Gmail's DOM — toolbar containers have overflow:hidden
  // and other layout rules that make injected children invisible.
  // Instead we use getBoundingClientRect() on the anchor to position precisely.
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
    // Offscreen until positioned — avoids flash in wrong location
    top: '-100px',
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

  // Once the toolbar anchor is visible, snap the toggle into position next to it.
  // Re-position on resize so it tracks correctly if the window changes.
  findToolbarAnchor()
    .then(waitForLayout)
    .then((anchor) => {
    const position = () => {
      const r = anchor.getBoundingClientRect();
      // Vertically centred on the anchor; placed 4px to its left
      toggle.style.top   = Math.round(r.top + (r.height - 40) / 2) + 'px';
      toggle.style.right = (window.innerWidth - r.left + 4) + 'px';
    };
    position();
    window.addEventListener('resize', position);
  }).catch(() => {
    // Toolbar anchor not found — fall back to a visible blue floating button
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
