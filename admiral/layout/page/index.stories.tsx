import { Meta, StoryObj } from "@storybook/react";
import Page, { TPageProps } from ".";
import { ThemeProvider } from "../../context";
import { globalThemeConfig } from "../../util";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const meta: Meta<TPageProps> = {
  title: "Design System/Layout/Page",
  component: Page,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Page is a component for displaying main content with breadcrumbs and top actions.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title for the page",
      defaultValue: "User",
    },
    children: {
      control: "node",
      description: "Main content of the page",
    },
    topActions: {
      control: "node",
      description: "Top actions to be displayed",
    },
    breadcrumbs: {
      control: "object",
      description: "Breadcrumbs to be displayed",
    },
  },
};

export default meta;

export const Default: StoryObj<TPageProps> = {
  args: {
    children: <div>Your main content goes here</div>,
    title: "User",
    breadcrumbs: [
      { path: "/", label: "Dashboard" },
      { path: "/user", label: "User" },
    ],
    topActions: <Button icon={<PlusOutlined />}>Create</Button>,
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={globalThemeConfig}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
