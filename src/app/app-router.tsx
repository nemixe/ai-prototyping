import { createBrowserRouter } from "react-router-dom";
import { userRouter } from "./users/user-router";
import { PREFIX } from "@/common/constants/prefix";
import { GlobalLayout } from "@/components/ui/global-layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: PREFIX.USERS,
        hasErrorBoundary: true,
        errorElement: <div>error</div>,
        children: userRouter,
      },
    ],
  },
]);
