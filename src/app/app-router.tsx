import { createBrowserRouter } from "react-router-dom";
import { PREFIX } from "@/commons/constants/prefix";
import { userRouter } from "./(protected)/users/user-router";
import { AppError } from "./_components/ui/app-error";
import { ProtectedLayout } from "./(protected)/_components/ui/layout";

export const router = createBrowserRouter([
  {
    path: PREFIX.AUTH,
    element: <div>Login</div>,
  },
  {
    path: PREFIX.ROOT,
    element: <ProtectedLayout />,
    errorElement: <AppError />,
    children: [
      {
        path: PREFIX.USERS,
        hasErrorBoundary: true,
        children: userRouter,
      },
    ],
  },
]);
