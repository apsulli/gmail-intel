// Find Gmail's top-bar anchor element (Support ? or Settings gear).
// Resolves when found, rejects after timeoutMs so the caller can fall back.
// Tries multiple selectors because Gmail's attribute values vary by locale/version.
function findToolbarAnchor(timeoutMs = 5000) {
  const selectors = [
    'div[data-tooltip="Support"]',
    'a[aria-label="Support"]',
    'div[data-tooltip^="Setting"]',
    'a[aria-label^="Setting"]',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',
    flexShrink: '0',
    background: 'transparent',
    transition: 'background 0.15s',
  });
  toggle.title = 'Gmail Intel';
  toggle.textContent = '📊';

  // Hover highlight matching Gmail's own toolbar icon buttons
  toggle.addEventListener('mouseover', () => { toggle.style.background = 'rgba(32,33,36,0.08)'; });
  toggle.addEventListener('mouseout',  () => { toggle.style.background = 'transparent'; });

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === 'translateX(0)';
    sidebar.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0)';
  });

  document.body.appendChild(sidebar);

  // Try to inject into Gmail's top bar before the Support/Settings icon.
  // If the toolbar anchor isn't found within 5 s, fall back to a fixed
  // floating button so the toggle is always reachable.
  findToolbarAnchor().then((anchor) => {
    anchor.parentElement.insertBefore(toggle, anchor);
  }).catch(() => {
    Object.assign(toggle.style, {
      position: 'fixed',
      right: '16px',
      bottom: '80px',
      background: '#1a73e8',
      color: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      zIndex: '10000',
    });
    document.body.appendChild(toggle);
  });

  return sidebar;
}
