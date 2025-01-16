import { ROUTES } from "@/commons/constants/routes";

export const UserRouter = [
  {
    path: ROUTES.IAM.USERS.LIST.URL,
    lazy: () => import("./list/page"),
  },
  {
    path: ROUTES.IAM.USERS.DETAIL.URL,
    lazy: () => import("./detail/page"),
  },
  {
    path: ROUTES.IAM.USERS.CREATE.URL,
    lazy: () => import("./create/page"),
  },
  {
    path: ROUTES.IAM.USERS.UPDATE.URL,
    lazy: () => import("./update/page"),
  },
];
