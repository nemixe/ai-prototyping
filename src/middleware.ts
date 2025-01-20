import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { filterPermission } from "./utils/permission";
import { PERMISSIONS } from "./commons/constants/permissions";
import { SessionCookies } from "./libs/cookies";

const mappingRoutePermissions = [
  {
    path: ROUTES.DASHBOARD.URL,
  },
  {
    path: ROUTES.IAM.USERS.LIST.URL,
    permissions: [PERMISSIONS.USERS.READ_USERS],
  },
];

const mappingPublicRoutes = ["/auth/login", "/auth/oauth-callback"];

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const session = SessionCookies.get();
  const userPermissions =
    session?.user?.roles
      ?.map((role) => role.permissions.map((perm) => perm.name))
      ?.flat() || [];

  const pathname = url.pathname;

  const allowedPermissions = filterPermission(
    mappingRoutePermissions,
    (route) =>
      (session && route.path === pathname && route.permissions
        ? route.permissions.some(
            (permission) => permission ?? userPermissions?.some(permission),
          )
        : true) || false,
  );

  if (mappingPublicRoutes.includes(pathname)) {
    return null;
  }

  if (!session) {
    return redirect(ROUTES.AUTH.LOGIN.URL);
  }

  if (allowedPermissions.length === 0) {
    return redirect(ROUTES.DASHBOARD.URL);
  }

  return null;
};
