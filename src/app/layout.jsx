import { LayoutWithHeader } from "admiral";
import { Flex, Typography } from "antd";
import { Link, Outlet } from "react-router";
import { BookOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const SIDEBAR_ITEMS = [
  {
    key: "role-route",
    label: <Link to={"/roles"}>Role</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "user-route",
    label: <Link to={"/users"}>Users</Link>,
    icon: <TeamOutlined />,
  },
  {
    key: "book-route",
    label: <Link to={"/books"}>Books</Link>,
    icon: <BookOutlined />,
  },
];

function MainLayout() {
  return (
    <LayoutWithHeader
      header={{
        brandLogo: (
          <Flex align="center" gap={8}>
            <Typography.Title
              level={4}
              style={{
                marginBottom: 0,
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              Prototype
            </Typography.Title>
          </Flex>
        ),
      }}
      sidebar={{
        width: 250,
        menu: SIDEBAR_ITEMS,
        theme: "light",
      }}
    >
      <Outlet />
    </LayoutWithHeader>
  );
}
export default MainLayout;
