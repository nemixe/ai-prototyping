import { ROUTES } from "@/commons/constants/routes";

export const AuthRouter = [
  {
    path: ROUTES.AUTH.LOGIN,
    lazy: () => import("./login/page"),
  },
  {
    path: ROUTES.AUTH.REGISTER,
    lazy: () => import("./register/page"),
  },
];
