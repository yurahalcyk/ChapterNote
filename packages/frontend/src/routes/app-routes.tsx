import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthLayout } from '../features/auth/auth-layout';
import { LoginForm } from '../features/auth/login/components/login-form';
import { RegisterForm } from '../features/auth/registration/components/register-form';
import { Dashboard } from '../features/dashboard/screens/dashboard';
import { NavigationListener } from '../middleware/utils/redirection-util/navigation-listener';
import { ProtectedRoute } from './protected-routes';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavigationListener />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
