import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { AccessTokenCookies, UserCookies } from "./libs/cookies";
import { checkPermission } from "./utils/permission";

export const pagePermission = (permissions: Array<string>) => {
  const userData = UserCookies.get();

  if (
    !checkPermission({
      permissions,
      userPermissions: userData?.role?.permissions?.map((val) => val?.name),
    })
  ) {
    return redirect("/permission-denied");
  }

  return null;
};

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const session = AccessTokenCookies.get();

  const pathname = url.pathname;

  const isAuthPath = Object.values(ROUTES.AUTH).some(
    (route) => route.URL === pathname,
  );

  if (isAuthPath && session) {
    return redirect(ROUTES.DASHBOARD.URL);
  }

  if (!isAuthPath && !session) {
    return redirect(ROUTES.AUTH.LOGIN.URL);
  }

  const userData = UserCookies.get();
  const userPermissions = userData?.role?.permissions?.map((val) => val?.name);

  const matchingRoute = Object.values(ROUTES).find((routeCategory) => {
    if (typeof routeCategory === "object" && !Array.isArray(routeCategory)) {
      return Object.values(routeCategory).some(
        (route) => route.URL === pathname,
      );
    }
    return false;
  });

  if (matchingRoute) {
    const routePermissions = Object.values(matchingRoute).find(
      (route) => route.URL === pathname,
    )?.PERMISSIONS;

    if (
      routePermissions &&
      !checkPermission({ permissions: routePermissions, userPermissions })
    ) {
      return redirect("/permission-denied");
    }
  }

  return null;
};
