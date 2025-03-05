import { LayoutWithHeader } from "admiral";
import { Flex, Typography } from "antd";
import { Link, Outlet } from "react-router";
import { DashboardOutlined, BookOutlined } from "@ant-design/icons";

const SIDEBAR_ITEMS = [
  {
    key: "dashboard",
    label: <Link to={"/"}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "books",
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
