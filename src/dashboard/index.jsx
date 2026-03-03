import { createRoot } from 'react-dom/client';
import DashboardApp from './DashboardApp.jsx';
import '../index.css';

export function mountDashboard(container, user, onClose) {
  const root = createRoot(container);
  root.render(<DashboardApp user={user} onClose={onClose} />);
}
