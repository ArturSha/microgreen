import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { PrivateRoute } from '@/features/privateRoute';
import { getRouteLogin, getRouteMain } from '@/shared/const/router';
import { Loader } from '@/shared/ui/Loader';
import App from '../../../App';

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      path: '/',
      children: [
        {
          path: getRouteLogin(),
          element: (
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: <Navigate to={getRouteLogin()} />,
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: getRouteMain(),
              element: (
                <Suspense fallback={<Loader />}>
                  <MainPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/microgreen',
  },
);
