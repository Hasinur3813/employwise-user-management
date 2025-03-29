import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/auth/Login.tsx";
import Users from "./pages/users/Users.tsx";
import UserUpdate from "./pages/UserUpdate/UserUpdate.tsx";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/publicRoute/PublicRoute.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:id",
    element: <UserUpdate />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
