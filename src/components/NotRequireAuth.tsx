import { useAuth } from '../hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function NotRequireAuth() {
  const { authenticated } = useAuth();
  const location = useLocation();
  return !authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default NotRequireAuth;
