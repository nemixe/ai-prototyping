import { Link } from "react-router-dom";
import { lazily } from "react-lazily";
import { QUERY_KEY } from "./query-key";
import { ROUTES } from "./routes";
import { PREFIX } from "./prefix";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";

const { BookOutlined, DashboardFilled, UserOutlined } = lazily(
  () => import("@ant-design/icons"),
);

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  permissions: string[];
  children?: TSidebarItem[];
};

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <DashboardFilled />,
    permissions: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
  },
  {
    key: PREFIX.USERS,
    label: "Users",
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USERS.READ_USERS],
    children: [
      {
        key: QUERY_KEY.USERS.LIST,
        label: <Link to={ROUTES.USERS.LIST.URL}>User Management</Link>,
        permissions: [PERMISSIONS.USERS.READ_USERS],
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: PREFIX.BOOKS,
    label: "Books",
    icon: <BookOutlined />,
    permissions: [],
    children: [
      {
        key: QUERY_KEY.BOOKS.LIST,
        label: <Link to={ROUTES.BOOKS.LIST.URL}>Book Management</Link>,
        icon: <BookOutlined />,
        permissions: [],
      },
    ],
  },
];
