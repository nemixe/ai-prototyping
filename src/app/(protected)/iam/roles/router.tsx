import { ROUTES } from "@/commons/constants/routes";

export const RoleRouter = [
  {
    path: ROUTES.iam.roles.list,
    lazy: () => import("./list/page"),
  },
  {
    path: ROUTES.iam.roles.detail,
    lazy: () => import("./detail/page"),
  },
  {
    path: ROUTES.iam.roles.create,
    lazy: () => import("./create/page"),
  },
  {
    path: ROUTES.iam.roles.update,
    lazy: () => import("./update/page"),
  },
];
