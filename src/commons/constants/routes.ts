export const ROUTES = {
  dashboard: "/dashboard",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    callback: "/auth/oauth-callback",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  iam: {
    users: {
      list: "/users",
      create: "/users/create",
      detail: "/users/:id/detail",
      update: "/users/:id/update",
      delete: "/users/:id/delete",
    },
    roles: {
      list: "/roles",
      create: "/roles/create",
      detail: "/roles/:id/detail",
      update: "/roles/:id/update",
      delete: "/roles/:id/delete",
    },
    permissions: {
      list: "/permissions",
      create: "/permissions/create",
      detail: "/permissions/:id/detail",
      update: "/permissions/:id/update",
      delete: "/permissions/:id/delete",
    },
  },
};
