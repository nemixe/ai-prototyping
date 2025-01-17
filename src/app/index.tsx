import { createBrowserRouter } from "react-router-dom";
import { middleware } from "@/middleware";
import { PREFIX } from "@/commons/constants/prefix";
import { UserRouter } from "./(protected)/iam/users/router";
import { AppError } from "./_components/ui/app-error";
import AntDProvider from "./_components/ui/theme-provider";
import { ProtectedLayout } from "./(protected)/_components/ui/layout";
import { DashboardRouter } from "./(protected)/dashboard/router";
import { AuthRouter } from "./(public)/auth/router";
import { PermissionRouter } from "./(protected)/iam/permissions/router";
import { RoleRouter } from "./(protected)/iam/roles/router";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: middleware,
    shouldRevalidate: () => true,
    element: <AntDProvider />,
    children: [
      {
        path: PREFIX.AUTH,
        children: AuthRouter,
      },
      {
        path: PREFIX.ROOT,
        element: <ProtectedLayout />,
        errorElement: <AppError />,
        children: [
          {
            path: PREFIX.DASHBOARD,
            children: DashboardRouter,
          },
          {
            path: PREFIX.IAM.ROOT,
            children: [
              {
                path: PREFIX.IAM.USERS,
                hasErrorBoundary: true,
                children: UserRouter,
              },
              {
                path: PREFIX.IAM.ROLES,
                hasErrorBoundary: true,
                children: RoleRouter,
              },
              {
                path: PREFIX.IAM.PERMISSIONS,
                hasErrorBoundary: true,
                children: PermissionRouter,
              },
            ],
          },
        ],
      },
    ],
  },
]);
