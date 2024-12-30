import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { ROUTES } from "./commons/constants/routes";
import { AccessTokenCookies, UserCookies } from "./libs/cookies";

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isAuthPath = url.pathname.startsWith("/auth");
  const session = AccessTokenCookies.get();

  if (isAuthPath && session) {
    return redirect(ROUTES.DASHBOARD);
  }

  if (!isAuthPath && !session) {
    return redirect(ROUTES.AUTH.LOGIN);
  }

  const users = UserCookies.get() ?? {};

  return {
    users,
  };
};
