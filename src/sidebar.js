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
    right: '16px',
    bottom: '80px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#1a73e8',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: '10000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'right 0.3s ease',
  });
  toggle.textContent = '📊';

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === 'translateX(0)';
    if (isOpen) {
      sidebar.style.transform = 'translateX(100%)';
      toggle.style.right = '16px';
    } else {
      sidebar.style.transform = 'translateX(0)';
      toggle.style.right = '376px';
    }
  });

  document.body.appendChild(sidebar);
  document.body.appendChild(toggle);

  return sidebar;
}
