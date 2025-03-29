import React from "react";
import { MenuProps } from "antd/lib/menu";
import { Col, Divider, Flex, Grid, Layout, Menu, Row, Space } from "antd";
import { theme } from "../../util";
import { MenuOutlined } from "@ant-design/icons";
import "./index.css";

const { Header, Sider } = Layout;

export interface LayoutProps {
  children: React.ReactNode;
  header: {
    brandLogo: React.ReactNode;
    menu?: React.ReactNode;
  };
  sidebar: {
    width: number;
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];
    defaultOpenKeys?: string[];
    openKeys?: string[];
    onSelect?: MenuProps["onSelect"];
    onDeselect?: MenuProps["onDeselect"];
    onClick?: MenuProps["onClick"];
    onOpenChange?: MenuProps["onOpenChange"];
    menu: MenuProps["items"];
    theme?: "light" | "dark";
    extra?: React.ReactNode;
  };
}

export interface ISidebarProps {
  width: number;
  defaultSelectedKeys: string[];
  defaultOpenKeys: string[];
  menu: MenuProps["items"];
  theme?: "light" | "dark";
}

export interface IHeaderContentProps {
  brandLogo: React.ReactNode;
  menu?: React.ReactNode;
  toggleSidebar?: () => void;
  onClick?: () => void;
}

const HeaderContent: React.FC<IHeaderContentProps> = ({
  brandLogo,
  menu,
  toggleSidebar,
  onClick,
}) => {
  const {
    admiral: {
      Header: { colorBg, colorText },
    },
  } = theme.useToken();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: colorBg,
        color: colorText,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 12,
        width: "100%",
      }}
      onClick={onClick}
    >
      <Row>
        <Col span={24} md={0}>
          <Flex align="center">
            <Flex
              justify="center"
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar?.();
              }}
            >
              <MenuOutlined />
            </Flex>
            <div style={{ display: "flex", alignItems: "center" }}>
              {brandLogo}
            </div>
          </Flex>
        </Col>
        <Col span={0} md={24}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {brandLogo}
          </div>
        </Col>
      </Row>

      <Space
        size={20}
        style={{
          marginLeft: "auto",
          paddingRight: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {menu}
      </Space>
    </Header>
  );
};

const MainLayout: React.FC<LayoutProps> = ({ children, header, sidebar }) => {
  const {
    admiral: {
      Sidebar: { colorBg, colorText },
    },
  } = theme.useToken();

  const { md } = Grid.useBreakpoint();
  const [collapsedOnMobile, setCollapsedOnMobile] = React.useState(true);

  return (
    <Layout className="main-layout">
      {!md && (
        <HeaderContent
          brandLogo={header.brandLogo}
          menu={header.menu}
          toggleSidebar={() => setCollapsedOnMobile((val) => !val)}
          onClick={() => setCollapsedOnMobile(true)}
        />
      )}

      <Layout style={{ height: "100vh" }}>
        <Sider
          collapsed={!md && collapsedOnMobile}
          collapsedWidth="0px"
          width={sidebar.width}
          style={{
            height: "100vh",
            insetInlineStart: 0,
            overflow: "auto",
            position: !md ? "fixed" : "relative",
            backgroundColor: colorBg,
            left: !md ? 0 : undefined,
            top: !md ? 0 : undefined,
            bottom: !md ? 0 : undefined,
            zIndex: !md ? 10 : undefined,
            filter: !md
              ? "drop-shadow(16px 4px 52px rgba(0, 0, 0, 0.25))"
              : undefined,
          }}
        >
          <div style={{ height: "64px", padding: "12px 12px 0px 12px" }}>
            {header.brandLogo}
          </div>
          <Divider style={{ margin: 0 }} />

          {sidebar.extra}

          <Menu
            mode="inline"
            defaultSelectedKeys={sidebar.defaultSelectedKeys}
            selectedKeys={sidebar.selectedKeys}
            defaultOpenKeys={sidebar.defaultOpenKeys}
            openKeys={sidebar.openKeys}
            onSelect={sidebar.onSelect}
            onDeselect={sidebar.onDeselect}
            onClick={sidebar.onClick}
            onOpenChange={sidebar.onOpenChange}
            style={{
              backgroundColor: colorBg,
              color: colorText,
              width: sidebar.width,
            }}
            theme={sidebar.theme}
            items={sidebar.menu}
            className="side-menu-main-layout"
          />
        </Sider>
        <Layout
          style={{
            padding: "24px",
            height: "100%",
            overflow: "auto",
            marginTop: !md ? 60 : 0,
          }}
          onClick={() => setCollapsedOnMobile(true)}
        >
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
