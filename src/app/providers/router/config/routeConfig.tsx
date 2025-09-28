import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { PrivateRoute } from '@/features/privateRoute';
import { getRouteMain } from '@/shared/const/router';
import App from '../../../App';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        path: '/microgreen/',
        element: (
          <Suspense fallback="loading...">
            <LoginPage />
          </Suspense>
        ),
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback="loading...">
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: getRouteMain(),
            element: (
              <Suspense fallback="loading...">
                <MainPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
