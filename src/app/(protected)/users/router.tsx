import { ROUTES } from "@/commons/constants/routes";
import { UsersCreatePage } from "./create/page";
import { UsersListPage } from "./list/page";
import { UsersUpdatePage } from "./update/page";
import { UsersDetailPage } from "./detail/page";
import { pagePermission } from "@/middleware";

export const UserRouter = [
  {
    path: ROUTES.USERS.LIST.URL,
    element: <UsersListPage />,
    loader: () => pagePermission(ROUTES.USERS.LIST.PERMISSIONS),
  },
  {
    path: ROUTES.USERS.DETAIL.URL,
    element: <UsersDetailPage />,
    loader: () => pagePermission(ROUTES.USERS.DETAIL.PERMISSIONS),
  },
  {
    path: ROUTES.USERS.CREATE.URL,
    element: <UsersCreatePage />,
    loader: () => pagePermission(ROUTES.USERS.CREATE.PERMISSIONS),
  },
  {
    path: ROUTES.USERS.UPDATE.URL,
    element: <UsersUpdatePage />,
    loader: () => pagePermission(ROUTES.USERS.UPDATE.PERMISSIONS),
  },
];
