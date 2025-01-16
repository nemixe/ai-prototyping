import { PERMISSIONS } from "./permissions";
import { PREFIX } from "./prefix";

export const ROUTES = {
  DASHBOARD: {
    URL: `${PREFIX.DASHBOARD}`,
    PERMISSIONS: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
  },
  AUTH: {
    LOGIN: { URL: `${PREFIX.AUTH}/login`, PERMISSIONS: [] },
    REGISTER: { URL: `${PREFIX.AUTH}/register`, PERMISSIONS: [] },
    FORGOT_PASSWORD: { URL: `${PREFIX.AUTH}/forgot-password`, PERMISSIONS: [] },
    RESET_PASSWORD: { URL: `${PREFIX.AUTH}/reset-password`, PERMISSIONS: [] },
  },
  USERS: {
    LIST: { URL: PREFIX.USERS, PERMISSIONS: [PERMISSIONS.USERS.READ_USERS] },
    CREATE: {
      URL: `${PREFIX.USERS}/create`,
      PERMISSIONS: [PERMISSIONS.USERS.CREATE_USERS],
    },
    DETAIL: {
      URL: `${PREFIX.USERS}/:id/detail`,
      PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
    },
    UPDATE: {
      URL: `${PREFIX.USERS}/:id/update`,
      PERMISSIONS: [PERMISSIONS.USERS.UPDATE_USERS],
    },
    DELETE: {
      URL: `${PREFIX.USERS}/:id/delete`,
      PERMISSIONS: [PERMISSIONS.USERS.DELETE_USERS],
    },
  },
};
