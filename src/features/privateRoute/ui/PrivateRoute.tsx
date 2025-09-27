import { Navigate, Outlet } from 'react-router-dom';
import { useIsLogin } from '@/entities/auth';
import { getRouteLogin } from '@/shared/const';

export const PrivateRoute = () => {
  return useIsLogin() ? <Outlet /> : <Navigate to={getRouteLogin()} />;
};
