// Wait for Gmail's top-bar support icon to appear, then resolve with it.
// Gmail renders the toolbar asynchronously after the main shell loads.
function waitForSupportIcon() {
  return new Promise((resolve) => {
    const sel = 'div[data-tooltip="Support"], a[aria-label="Support"]';
    const el = document.querySelector(sel);
    if (el) { resolve(el); return; }
    const obs = new MutationObserver(() => {
      const el = document.querySelector(sel);
      if (el) { obs.disconnect(); resolve(el); }
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
  // Styled to match Gmail's top-bar icon buttons (same size as Help/Settings)
  Object.assign(toggle.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
    margin: '0 4px',
    flexShrink: '0',
  });
  toggle.title = 'Gmail Intel';
  toggle.textContent = '📊';

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === 'translateX(0)';
    sidebar.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0)';
  });

  document.body.appendChild(sidebar);

  // Inject toggle into Gmail's top bar, just before the Support (?) icon.
  // Falls back to appending to body (fixed position) if the toolbar is not found.
  waitForSupportIcon().then((supportIcon) => {
    supportIcon.parentElement.insertBefore(toggle, supportIcon);
  }).catch(() => {
    // Fallback: original floating button if toolbar anchor not found
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
