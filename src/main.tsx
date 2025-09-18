import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/providers/router';
import { appStore } from './app/providers/store';

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={appStore}>
    <RouterProvider router={router} />
  </ReduxProvider>,
);
