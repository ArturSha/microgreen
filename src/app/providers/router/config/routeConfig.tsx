import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { PrivateRoute } from '@/features/privateRoute';
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
        ],
      },
    ],
  },
]);
