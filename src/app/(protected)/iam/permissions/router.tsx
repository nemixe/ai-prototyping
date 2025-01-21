import { ROUTES } from "@/commons/constants/routes";

export const PermissionRouter = [
  {
    path: ROUTES.iam.permissions.list,
    lazy: () => import("./list/page"),
  },
  {
    path: ROUTES.iam.permissions.detail,
    lazy: () => import("./detail/page"),
  },
  {
    path: ROUTES.iam.permissions.create,
    lazy: () => import("./create/page"),
  },
  {
    path: ROUTES.iam.permissions.update,
    lazy: () => import("./update/page"),
  },
];
