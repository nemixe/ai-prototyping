import { PREFIX } from "./prefix";

export const ROUTES = {
  AUTH: {
    LOGIN: `${PREFIX.AUTH}/login`,
    REGISTER: `${PREFIX.AUTH}/register`,
    FORGOT_PASSWORD: `${PREFIX.AUTH}/forgot-password`,
    RESET_PASSWORD: `${PREFIX.AUTH}/reset-password`,
  },
  USERS: {
    LIST: PREFIX.USERS,
    CREATE: `${PREFIX.USERS}/create`,
    DETAIL: `${PREFIX.USERS}/:id/detail`,
    UPDATE: `${PREFIX.USERS}/:id/update`,
    DELETE: `${PREFIX.USERS}/:id/delete`,
  },
  BOOKS: {
    LIST: PREFIX.BOOKS,
    CREATE: `${PREFIX.BOOKS}/create`,
    DETAIL: `${PREFIX.BOOKS}/:id/detail`,
    UPDATE: `${PREFIX.BOOKS}/:id/update`,
    DELETE: `${PREFIX.BOOKS}/:id/delete`,
  },
  CATEGORIES: {
    LIST: PREFIX.CATEGORIES,
    CREATE: `${PREFIX.CATEGORIES}/create`,
    DETAIL: `${PREFIX.CATEGORIES}/:id/detail`,
    UPDATE: `${PREFIX.CATEGORIES}/:id/update`,
    DELETE: `${PREFIX.CATEGORIES}/:id/delete`,
  },
  AUTHORS: {
    LIST: PREFIX.AUTHORS,
    CREATE: `${PREFIX.AUTHORS}/create`,
    DETAIL: `${PREFIX.AUTHORS}/:id/detail`,
    UPDATE: `${PREFIX.AUTHORS}/:id/update`,
    DELETE: `${PREFIX.AUTHORS}/:id/delete`,
  },
};
