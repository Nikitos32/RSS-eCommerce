import { useAuth } from '../hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const { authenticated } = useAuth();
  const location = useLocation();
  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

export default RequireAuth;
