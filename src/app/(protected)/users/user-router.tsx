import { ROUTES } from "@/commons/constants/routes";
import { UsersCreatePage } from "./create/page";
import { UsersListPage } from "./list/page";
import { UsersUpdatePage } from "./update/page";
import { UsersDetailPage } from "./detail/page";

export const userRouter = [
  {
    path: ROUTES.USERS.LIST,
    element: <UsersListPage />,
  },
  {
    path: ROUTES.USERS.DETAIL,
    element: <UsersDetailPage />,
  },
  {
    path: ROUTES.USERS.CREATE,
    element: <UsersCreatePage />,
  },
  {
    path: ROUTES.USERS.UPDATE,
    element: <UsersUpdatePage />,
  },
];
