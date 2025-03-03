export const roleRoute = [
  {
    path: "/roles",
    lazy: () => import("./list"),
  },
  {
    path: "/roles/detail/:id",
    lazy: () => import("./detail"),
  },
  {
    path: "/roles/create",
    lazy: () => import("./create"),
  },
  {
    path: "/roles/update/:id",
    lazy: () => import("./update"),
  },
];
