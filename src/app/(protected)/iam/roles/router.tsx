import { ROUTES } from "@/commons/constants/routes";

export const RoleRouter = [
  {
    path: ROUTES.IAM.ROLES.LIST.URL,
    lazy: () => import("./list/page"),
  },
  {
    path: ROUTES.IAM.ROLES.DETAIL.URL,
    lazy: () => import("./detail/page"),
  },
  {
    path: ROUTES.IAM.ROLES.CREATE.URL,
    lazy: () => import("./create/page"),
  },
  {
    path: ROUTES.IAM.ROLES.UPDATE.URL,
    lazy: () => import("./update/page"),
  },
];
