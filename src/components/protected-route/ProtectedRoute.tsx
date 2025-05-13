import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { getCookie } from '../../utils/cookie';

interface ProtectedRouteProps {
  onlyUnauth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnauth = false,
  children
}) => {
  const location = useLocation();
  const isAuthenticated = getCookie('accessToken');

  if (onlyUnauth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnauth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
