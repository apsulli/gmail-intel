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
    zIndex: '2147483647',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
  });

  // Inner div: the React root. React owns only this element.
  // Keeping it separate from sidebar means any siblings we add to sidebar
  // (e.g. a close button) won't be wiped when React mounts.
  const content = document.createElement('div');
  Object.assign(content.style, { height: '100%', overflowY: 'auto' });
  sidebar.appendChild(content);

  const closeTab = document.createElement('div');
  Object.assign(closeTab.style, {
    position: 'absolute',
    left: '-28px',
    top: '50%',
    width: '28px',
    height: '60px',
    marginTop: '-30px',
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
    zIndex: '10',
    boxShadow: '-4px 0 8px rgba(0,0,0,0.4)',
    transition: 'background 0.2s, color 0.2s'
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
  
  sidebar.appendChild(closeTab);

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
  toggle.addEventListener('mouseout',  () => { 
    toggle.style.transform = 'scale(1)'; 
    toggle.style.boxShadow = 'none';
  });

  const openSidebar  = () => {
    sidebar.style.transform = 'translateX(0)';
    closeTab.textContent = '›';
    closeTab.title = 'Close Sidebar';
  };
  const closeSidebar = () => {
    sidebar.style.transform = 'translateX(100%)';
    closeTab.textContent = '‹';
    closeTab.title = 'Open Sidebar';
  };
  const isOpen = () => sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === 'translateX(0)';

  toggle.addEventListener('click', () => isOpen() ? closeSidebar() : openSidebar());
  closeTab.addEventListener('click', () => isOpen() ? closeSidebar() : openSidebar());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeSidebar();
  });

  const updateSidebarOffset = () => {
    const els = document.elementsFromPoint(window.innerWidth - 1, window.innerHeight / 2);
    let el = null;
    for (const e of els) {
      if (e.id !== 'gmail-intel-sidebar' && (!e.id || !e.id.includes('gmail-intel'))) {
        el = e;
        break;
      }
    }
    let offset = 0;
    if (el) {
      let curr = el;
      while (curr && curr !== document.body) {
        if (curr.getBoundingClientRect) {
          const r = curr.getBoundingClientRect();
          if (r.right >= window.innerWidth - 10 && r.width > 20 && r.width < 500 && r.height > window.innerHeight * 0.5) {
            offset = Math.max(offset, r.width);
          }
        }
        curr = curr.parentElement;
      }
    }
    sidebar.style.right = offset + 'px';
  };
  setInterval(updateSidebarOffset, 250);

  document.body.appendChild(sidebar);
  document.body.appendChild(toggle);

  findVisibleToolbarAnchor().then((anchor) => {
    const applyPosition = () => {
      const r = anchor.getBoundingClientRect();
      // Place toggle immediately left of the Support icon with a 12px gap.
      // Use the anchor's aria-label to confirm we have the right element.
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
