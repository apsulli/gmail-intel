// Find the VISIBLE Support (?) anchor in Gmail's toolbar.
// Gmail has multiple elements matching these selectors; filter to the one
// actually in the toolbar (visible, top < 150px).
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

// Returns { container, close }.
// container — the inner div that React should mount into.
// close     — call to collapse the sidebar.
export function initSidebar() {
  // ── Sidebar panel ────────────────────────────────────────────────────────
  // Open/close is controlled via the `right` CSS property (not transform).
  // When closed: right = -360px (completely off-screen, no leaking content).
  // When open:   right = currentRightOffset (flush beside Gmail side panel).
  // overflow:hidden ensures content never bleeds into the closed position.
  const sidebar = document.createElement('div');
  sidebar.id = 'gmail-intel-sidebar';
  Object.assign(sidebar.style, {
    position: 'fixed',
    top: '0',
    right: '-360px',
    height: '100vh',
    width: '360px',
    background: 'var(--bg-sidebar, #121212)',
    boxShadow: '-4px 0 16px rgba(0,0,0,0.5)',
    zIndex: '2147483647',
    transition: 'right 0.3s ease',
    borderRadius: '12px 0 0 12px',
    overflow: 'hidden',
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
  });

  // Inner div: the React root. React owns only this element.
  const content = document.createElement('div');
  Object.assign(content.style, { height: '100%', overflowY: 'auto' });
  sidebar.appendChild(content);

  // ── Pull-out tab ──────────────────────────────────────────────────────────
  // Kept as a SIBLING of sidebar (not a child) so it is never clipped by
  // sidebar's overflow:hidden and always remains visible at the screen edge.
  // Its `right` property is animated in sync with the sidebar.
  const closeTab = document.createElement('div');
  Object.assign(closeTab.style, {
    position: 'fixed',
    top: '50%',
    right: '0px',   // set dynamically by updateCloseTabRight()
    width: '28px',
    height: '60px',
    transform: 'translateY(-50%)',
    background: 'var(--bg-card, #202020)',
    border: '2px solid var(--accent-primary, #FF1493)',
    borderRight: 'none',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--accent-primary, #FF1493)',
    fontSize: '20px',
    fontWeight: 'bold',
    zIndex: '2147483648',
    boxShadow: '-4px 0 8px rgba(0,0,0,0.4)',
    transition: 'right 0.3s ease, background 0.2s, color 0.2s',
  });
  closeTab.title = 'Open Sidebar';
  closeTab.textContent = '‹';

  closeTab.addEventListener('mouseover', () => {
    closeTab.style.background = 'var(--accent-primary, #FF1493)';
    closeTab.style.color = '#FFFFFF';
  });
  closeTab.addEventListener('mouseout', () => {
    closeTab.style.background = 'var(--bg-card, #202020)';
    closeTab.style.color = 'var(--accent-primary, #FF1493)';
  });

  // ── Toggle button (in Gmail toolbar) ─────────────────────────────────────
  const toggle = document.createElement('div');
  toggle.id = 'gmail-intel-toggle';
  Object.assign(toggle.style, {
    position: 'fixed',
    zIndex: '2147483646',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',
    background: 'var(--bg-card, #202020)',
    border: '2px solid var(--accent-primary, #FF1493)',
    transition: 'transform 0.15s, box-shadow 0.15s',
    top: '-100px',
    left: '0',
  });
  toggle.title = 'Gmail Intel';
  toggle.textContent = '👀';

  toggle.addEventListener('mouseover', () => {
    toggle.style.transform = 'scale(1.1)';
    toggle.style.boxShadow = '0 0 8px var(--accent-primary, #FF1493)';
  });
  toggle.addEventListener('mouseout', () => {
    toggle.style.transform = 'scale(1)';
    toggle.style.boxShadow = 'none';
  });

  // ── State & position helpers ──────────────────────────────────────────────
  let currentRightOffset = 0;
  let sidebarIsOpen = false;

  // closeTab sits at the sidebar's left edge when open, at the screen edge when closed.
  // With right-based coordinates: sidebar left edge = currentRightOffset + 360 from right.
  const updateCloseTabRight = () => {
    closeTab.style.right = sidebarIsOpen
      ? (currentRightOffset + 360) + 'px'
      : currentRightOffset + 'px';
  };

  const openSidebar = () => {
    sidebarIsOpen = true;
    sidebar.style.right = currentRightOffset + 'px';
    closeTab.textContent = '›';
    closeTab.title = 'Close Sidebar';
    updateCloseTabRight();
  };

  const closeSidebar = () => {
    sidebarIsOpen = false;
    sidebar.style.right = '-360px';
    closeTab.textContent = '‹';
    closeTab.title = 'Open Sidebar';
    updateCloseTabRight();
  };

  toggle.addEventListener('click', () => sidebarIsOpen ? closeSidebar() : openSidebar());
  closeTab.addEventListener('click', () => sidebarIsOpen ? closeSidebar() : openSidebar());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarIsOpen) closeSidebar();
  });

  // ── Sidebar offset (tracks Gmail side panel) ──────────────────────────────
  // [role="main"] resizes when Gmail's side panel opens/closes — ResizeObserver
  // fires immediately with no polling lag.
  const updateSidebarOffset = () => {
    const main = document.querySelector('[role="main"]');
    if (!main) return;
    const { right } = main.getBoundingClientRect();
    currentRightOffset = Math.max(0, window.innerWidth - right);
    if (sidebarIsOpen) sidebar.style.right = currentRightOffset + 'px';
    updateCloseTabRight();
  };

  const main = document.querySelector('[role="main"]');
  if (main) {
    const ro = new ResizeObserver(updateSidebarOffset);
    ro.observe(main);
  }
  window.addEventListener('resize', updateSidebarOffset);
  updateSidebarOffset();

  // closeTab is appended to body as a sibling of sidebar, NOT as a child.
  document.body.appendChild(sidebar);
  document.body.appendChild(closeTab);
  document.body.appendChild(toggle);

  findVisibleToolbarAnchor().then((anchor) => {
    const applyPosition = () => {
      const r = anchor.getBoundingClientRect();
      toggle.style.top  = Math.round(r.top + (r.height - 40) / 2) + 'px';
      toggle.style.left = (r.left - 40 - 52) + 'px';
    };
    applyPosition();
    window.addEventListener('resize', applyPosition);
  }).catch(() => {
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

  return { container: content, close: closeSidebar };
}
