import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import { LoginPage } from "../../../../pages/login";
import { Suspense } from "react";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "/microgreen/",
        element: (
          <Suspense fallback="loading...">
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);
