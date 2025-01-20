import { ROUTES } from "@/commons/constants/routes";

export const UserRouter = [
  {
    path: ROUTES.iam.users.list,
    lazy: () => import("./list/page"),
  },
  {
    path: ROUTES.iam.users.detail,
    lazy: () => import("./detail/page"),
  },
  {
    path: ROUTES.iam.users.create,
    lazy: () => import("./create/page"),
  },
  {
    path: ROUTES.iam.users.update,
    lazy: () => import("./update/page"),
  },
];
