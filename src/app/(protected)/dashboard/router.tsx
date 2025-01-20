import { ROUTES } from "@/commons/constants/routes";

export const DashboardRouter = [
  {
    path: ROUTES.dashboard,
    lazy: () => import("./page"),
  },
];
