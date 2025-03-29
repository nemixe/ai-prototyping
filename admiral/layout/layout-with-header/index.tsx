import React from "react";
import { MenuProps } from "antd/lib/menu";
import { Col, Flex, Grid, Layout, Menu, Row, Space } from "antd";
import { theme } from "../../util";
import { MenuOutlined } from "@ant-design/icons";
import "./index.css";

const { Header, Sider } = Layout;

export interface LayoutWithHeaderProps {
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
        top: 0,
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

const LayoutWithHeader: React.FC<LayoutWithHeaderProps> = ({
  children,
  header,
  sidebar,
}) => {
  const {
    admiral: {
      Sidebar: { colorBg, colorText },
    },
  } = theme.useToken();

  const { md } = Grid.useBreakpoint();
  const [collapsedOnMobile, setCollapsedOnMobile] = React.useState(true);

  return (
    <Layout className="layout-with-header">
      <HeaderContent
        brandLogo={header.brandLogo}
        menu={header.menu}
        toggleSidebar={() => setCollapsedOnMobile((val) => !val)}
        onClick={() => setCollapsedOnMobile(true)}
      />

      <Layout style={{ height: "calc(100vh - 64px)", overflow: "auto" }}>
        <Sider
          collapsed={!md && collapsedOnMobile}
          collapsedWidth="0px"
          width={sidebar.width}
        >
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
              maxWidth: `${sidebar.width}px`,
              padding: "20px 0px",
              overflow: "auto",
            }}
            theme={sidebar.theme}
            items={sidebar.menu}
            className="side-menu-layout-with-header"
          />
        </Sider>
        <Layout
          style={{
            padding: "24px",
            height: "100%",
            overflow: "auto",
          }}
          onClick={() => setCollapsedOnMobile(true)}
        >
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutWithHeader;
