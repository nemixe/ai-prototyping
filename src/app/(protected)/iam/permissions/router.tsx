import { ROUTES } from "@/commons/constants/routes";

export const PermissionRouter = [
  {
    path: ROUTES.IAM.PERMISSIONS.LIST.URL,
    lazy: () => import("./list/page"),
  },
  {
    path: ROUTES.IAM.PERMISSIONS.DETAIL.URL,
    lazy: () => import("./detail/page"),
  },
  {
    path: ROUTES.IAM.PERMISSIONS.CREATE.URL,
    lazy: () => import("./create/page"),
  },
  {
    path: ROUTES.IAM.PERMISSIONS.UPDATE.URL,
    lazy: () => import("./update/page"),
  },
];
