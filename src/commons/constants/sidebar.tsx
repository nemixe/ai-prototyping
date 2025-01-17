import { Link } from "react-router-dom";
import { lazily } from "react-lazily";
import { ROUTES } from "./routes";
import { PREFIX } from "./prefix";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";

const { DashboardFilled, UserOutlined } = lazily(
  () => import("@ant-design/icons"),
);

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  permissions?: string[];
  children?: TSidebarItem[];
};

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <DashboardFilled />,
  },
  {
    key: PREFIX.USERS,
    label: "IAM",
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USERS.READ_USERS],
    children: [
      {
        key: ROUTES.IAM.USERS.LIST.URL,
        label: <Link to={ROUTES.IAM.USERS.LIST.URL}>User</Link>,
        permissions: [PERMISSIONS.USERS.READ_USERS],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.IAM.ROLES.LIST.URL,
        label: <Link to={ROUTES.IAM.ROLES.LIST.URL}>Role</Link>,
        permissions: [PERMISSIONS.ROLES.READ_ROLES],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.IAM.PERMISSIONS.LIST.URL,
        label: <Link to={ROUTES.IAM.PERMISSIONS.LIST.URL}>Permission</Link>,
        permissions: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
        icon: <UserOutlined />,
      },
    ],
  },
];
