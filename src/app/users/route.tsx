export const userRoute = [
  {
    path: "/users",
    lazy: () => import("./list"),
  },
  {
    path: "/users/detail/:id",
    lazy: () => import("./detail"),
  },
  {
    path: "/users/create",
    lazy: () => import("./create"),
  },
];
