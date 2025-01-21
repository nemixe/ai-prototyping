import { ROUTES } from "@/commons/constants/routes";

export const AuthRouter = [
  {
    path: ROUTES.auth.login,
    lazy: () => import("./login/page"),
  },
  {
    path: ROUTES.auth.register,
    lazy: () => import("./register/page"),
  },
  {
    path: ROUTES.auth.callback,
    lazy: () => import("./oauth-callback/page"),
  },
];
