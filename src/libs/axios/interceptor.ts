import { ROUTES } from "@/commons/constants/routes";
import { api } from "./api";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = ROUTES.AUTH.LOGIN;
    }
    return Promise.reject(error);
  },
);
