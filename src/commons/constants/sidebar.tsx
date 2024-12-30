import { Link } from "react-router-dom";
import { lazily } from "react-lazily";
import type { MenuProps } from "antd";
import { QUERY_KEY } from "./query-key";
import { ROUTES } from "./routes";
import { PREFIX } from "./prefix";

const { BookOutlined, DashboardFilled, UserOutlined } = lazily(
  () => import("@ant-design/icons")
);

export const SIDEBAR_ITEMS: MenuProps["items"] = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <DashboardFilled />,
  },
  {
    key: PREFIX.USERS,
    label: "Users",
    icon: <UserOutlined />,
    children: [
      {
        key: QUERY_KEY.USERS.LIST,
        label: <Link to={ROUTES.USERS.LIST}>User Management</Link>,
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: PREFIX.BOOKS,
    label: "Books",
    icon: <BookOutlined />,
    children: [
      {
        key: QUERY_KEY.BOOKS.LIST,
        label: <Link to={ROUTES.BOOKS.LIST}>Book Management</Link>,
        icon: <BookOutlined />,
      },
    ],
  },
];
