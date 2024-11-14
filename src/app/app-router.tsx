import { createBrowserRouter } from "react-router-dom";
import { PREFIX } from "@/commons/constants/prefix";
import { GlobalError } from "./_components/ui/global-error";
import { ProtectedLayout } from "./(protected)/_components/protected-layout";
import { userRouter } from "./(protected)/users/user-router";

export const router = createBrowserRouter([
  {
    path: PREFIX.AUTH,
    element: <div>Login</div>,
  },
  {
    path: PREFIX.ROOT,
    element: <ProtectedLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        path: PREFIX.USERS,
        hasErrorBoundary: true,
        children: userRouter,
      },
    ],
  },
]);
