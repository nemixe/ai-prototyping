import { Meta, StoryObj } from "@storybook/react";
import MainLayout, { LayoutProps } from ".";
import { ThemeProvider } from "../../context";
import { sidebarThemeConfig } from "../../util";
import { Page } from "..";
import {
  ClockCircleOutlined,
  MailOutlined,
  NotificationOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import { CompanyLogo } from "../../icon";
import { UserAvatar } from "../../avatar";

const meta: Meta<LayoutProps> = {
  title: "Design System/Layout/MainLayout",
  component: MainLayout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MainLayout is a component for displaying main content with a header and sidebar.",
      },
    },
  },
  argTypes: {
    header: {
      description: "Header configuration",
      control: { type: "object" },
    },
    sidebar: {
      description: "Sidebar configuration",
      control: { type: "object" },
    },
    children: {
      description: "Main content to be displayed",
      control: { type: "node" },
    },
  },
};

export default meta;

export const Default: StoryObj<LayoutProps> = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={sidebarThemeConfig}>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    children: (
      <Page
        title="User"
        breadcrumbs={[
          { path: "/", label: "Dashboard" },
          { path: "/user", label: "User" },
        ]}
        topActions={<Button icon={<PlusOutlined />}>Create</Button>}
      >
        <div>Your main content goes here</div>
      </Page>
    ),
    header: {
      brandLogo: (
        <CompanyLogo src="https://static-00.iconduck.com/assets.00/ant-design-icon-2048x2046-dl3neb73.png" />
      ),
      menu: (
        <>
          <MailOutlined />
          <ClockCircleOutlined />
          <NotificationOutlined />
          <UserAvatar
            info={{
              fullname: "John Doe",
              roles: [{ name: "Admin" }],
            }}
          />
        </>
      ),
    },
    sidebar: {
      extra: (
        <Flex justify="space-between" style={{ padding: "20px 24px 0px 24px" }}>
          <UserAvatar
            info={{
              fullname: "John Doe",
              roles: [{ name: "Admin" }],
            }}
          />
          <NotificationOutlined />
        </Flex>
      ),
      width: 232,
      defaultSelectedKeys: ["1"],
      defaultOpenKeys: ["sub1"],
      menu: [
        {
          key: "1",
          label: "Option 1",
        },
        {
          key: "2",
          label: "Option 2",
        },
      ],
      theme: "light",
    },
  },
};
