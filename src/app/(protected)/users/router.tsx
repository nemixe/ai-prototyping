import { ROUTES } from "@/commons/constants/routes";
import { UsersCreatePage } from "./create/page";
import { UsersListPage } from "./list/page";
import { UsersUpdatePage } from "./update/page";
import { UsersDetailPage } from "./detail/page";

export const UserRouter = [
  {
    path: ROUTES.USERS.LIST.URL,
    element: <UsersListPage />,
  },
  {
    path: ROUTES.USERS.DETAIL.URL,
    element: <UsersDetailPage />,
  },
  {
    path: ROUTES.USERS.CREATE.URL,
    element: <UsersCreatePage />,
  },
  {
    path: ROUTES.USERS.UPDATE.URL,
    element: <UsersUpdatePage />,
  },
];
