import { Suspense } from "react";
import { Outlet } from "react-router";

import style from "./MainLayout.module.css";

export const MainLayout = () => {
  return (
    <>
      <section className={style.layout}>
        <header>hello micro</header>
        <Suspense>
          <Outlet />
        </Suspense>
      </section>
    </>
  );
};
