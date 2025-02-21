export const bookRoute = [
  {
    path: "/books",
    lazy: () => import("./list"),
  },
];
