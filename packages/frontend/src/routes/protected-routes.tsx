import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../app/hooks';

export const ProtectedRoute = () => {
  const token = useAppSelector(state => state.login.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
