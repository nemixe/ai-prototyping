import { createBrowserRouter } from "react-router";

import MainLayout from "./layout";
import { roleRoute } from "./examples/route";
import { userRoute } from "./users/route";

const testRoute = [
  {
    path: "/test",
    lazy: () => "test page",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    shouldRevalidate: () => true,
    element: <MainLayout />,
    children: [...roleRoute, ...userRoute, ...testRoute],
  },
]);
