import { Suspense } from 'react';
import { Outlet } from 'react-router';
import style from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <>
      <section className={style.layout}>
        <Suspense>
          <Outlet />
        </Suspense>
      </section>
    </>
  );
};
