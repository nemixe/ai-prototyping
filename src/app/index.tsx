import { createBrowserRouter } from "react-router-dom";
import { middleware } from "@/middleware";
import { UserRouter } from "./(protected)/iam/users/router";
import { AppError } from "./_components/ui/app-error";
import AntDProvider from "./_components/providers/theme";
import { DashboardRouter } from "./(protected)/dashboard/router";
import { AuthRouter } from "./(public)/auth/router";
import { PermissionRouter } from "./(protected)/iam/permissions/router";
import { RoleRouter } from "./(protected)/iam/roles/router";
import { ROUTES } from "@/commons/constants/routes";
import { ProtectedLayout } from "./_components/layouts/protected";
import SessionProvider from "./_components/providers/session";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: middleware,
    shouldRevalidate: () => true,
    element: (
      <SessionProvider>
        <AntDProvider />
      </SessionProvider>
    ),
    children: [
      {
        children: AuthRouter,
      },
      {
        element: <ProtectedLayout />,
        errorElement: <AppError />,
        children: [
          {
            children: DashboardRouter,
          },
          {
            children: [
              {
                path: ROUTES.iam.users.list,
                hasErrorBoundary: true,
                children: UserRouter,
              },
              {
                path: ROUTES.iam.roles.list,
                hasErrorBoundary: true,
                children: RoleRouter,
              },
              {
                path: ROUTES.iam.permissions.list,
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
