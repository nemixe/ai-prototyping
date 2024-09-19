import { createBrowserRouter } from "react-router-dom";
import { UsersCreatePage } from "./users/create/page";
import { Suspense } from "react";
import { UsersDetailPage } from "./users/detail/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: "",
  },
  {
    path: "/users",
    element: <Suspense></Suspense>,
    children: [
      {
        path: "create",
        element: <UsersCreatePage />,
      },
      {
        path: ":id",
        element: <UsersDetailPage />,
      },
      {
        path: ":id/edit",
        element: <UsersCreatePage />,
      },
    ],
  },
  {
    path: "/books",
    element: <Suspense></Suspense>,
    children: [
      {
        path: "create",
        element: <UsersCreatePage />,
      },
      {
        path: ":id",
        element: <UsersCreatePage />,
      },
      {
        path: ":id/edit",
        element: <UsersCreatePage />,
      },
    ],
  },
]);
