import { createRoot } from 'react-dom/client';
import DashboardApp from './DashboardApp.jsx';

export function mountDashboard(container, user) {
  const root = createRoot(container);
  root.render(<DashboardApp user={user} />);
}
