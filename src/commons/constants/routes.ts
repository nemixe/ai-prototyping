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
  BOOKS: {
    LIST: { URL: PREFIX.BOOKS, PERMISSIONS: [] },
    CREATE: { URL: `${PREFIX.BOOKS}/create`, PERMISSIONS: [] },
    DETAIL: { URL: `${PREFIX.BOOKS}/:id/detail`, PERMISSIONS: [] },
    UPDATE: { URL: `${PREFIX.BOOKS}/:id/update`, PERMISSIONS: [] },
    DELETE: { URL: `${PREFIX.BOOKS}/:id/delete`, PERMISSIONS: [] },
  },
  CATEGORIES: {
    LIST: { URL: PREFIX.CATEGORIES, PERMISSIONS: [] },
    CREATE: { URL: `${PREFIX.CATEGORIES}/create`, PERMISSIONS: [] },
    DETAIL: { URL: `${PREFIX.CATEGORIES}/:id/detail`, PERMISSIONS: [] },
    UPDATE: { URL: `${PREFIX.CATEGORIES}/:id/update`, PERMISSIONS: [] },
    DELETE: { URL: `${PREFIX.CATEGORIES}/:id/delete`, PERMISSIONS: [] },
  },
  AUTHORS: {
    LIST: { URL: PREFIX.AUTHORS, PERMISSIONS: [] },
    CREATE: { URL: `${PREFIX.AUTHORS}/create`, PERMISSIONS: [] },
    DETAIL: { URL: `${PREFIX.AUTHORS}/:id/detail`, PERMISSIONS: [] },
    UPDATE: { URL: `${PREFIX.AUTHORS}/:id/update`, PERMISSIONS: [] },
    DELETE: { URL: `${PREFIX.AUTHORS}/:id/delete`, PERMISSIONS: [] },
  },
};
