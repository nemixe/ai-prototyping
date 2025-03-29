import { Meta, StoryObj } from "@storybook/react";
import LayoutWithHeader, { LayoutWithHeaderProps } from ".";
import { ThemeProvider } from "../../context";
import { sidebarThemeConfig } from "../../util";
import {
  ClockCircleOutlined,
  MailOutlined,
  NotificationOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserAvatar from "../../avatar/user-avatar";
import Page from "../page";
import { Button } from "antd";
import Menu from "../../menu";

const meta: Meta<LayoutWithHeaderProps> = {
  title: "Design System/Layout/LayoutWithHeader",
  component: LayoutWithHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "LayoutWithHeader is a component for displaying a layout with a header.",
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

export const Default: StoryObj<LayoutWithHeaderProps> = {
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
        <div>Your main content goes here</div>
      </Page>
    ),
    header: {
      brandLogo: <div>Your brand logo goes here</div>,
      menu: (
        <>
          <Menu
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Menu.Dropdown title="Email" label={<MailOutlined />}>
              Put your content menu here
            </Menu.Dropdown>

            <Menu.Dropdown
              title="Schedule"
              label={<ClockCircleOutlined />}
              moreText={<a href="https://www.google.com/">More</a>}
            >
              Put your content menu here
            </Menu.Dropdown>

            <Menu.Dropdown
              title="Notification"
              label={<NotificationOutlined />}
            >
              Put your content menu here
            </Menu.Dropdown>

            <Menu.Dropdown
              title="Profile"
              label={
                <UserAvatar
                  info={{
                    fullname: "John Doe",
                    roles: [{ name: "Admin" }],
                  }}
                />
              }
            >
              Put your content menu here
            </Menu.Dropdown>
          </Menu>
        </>
      ),
    },
    sidebar: {
      width: 200,
      defaultSelectedKeys: ["1"],
      defaultOpenKeys: ["sub1"],
      menu: [
        {
          key: "1",
          label: "Option 1",
          icon: <MailOutlined />,
        },
        {
          key: "2",
          label: "Option 2",
          icon: <MailOutlined />,
        },
      ],
      theme: "light",
    },
  },
};
