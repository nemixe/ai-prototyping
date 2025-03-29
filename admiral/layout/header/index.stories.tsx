import { Meta, StoryObj } from "@storybook/react";
import MainHeader, { TMainHeaderProps } from ".";

const meta: Meta<TMainHeaderProps> = {
  title: "Design System/Layout/MainHeader",
  component: MainHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MainHeader is a component for displaying user information and additional content.",
      },
    },
  },
  argTypes: {
    setCollapsed: {
      description: "Function to toggle the collapsed state",
      control: { type: "function" },
    },
    collapsed: {
      description: "Whether the header is collapsed",
      control: { type: "boolean" },
    },
    info: {
      description: "User information to be displayed",
      control: { type: "object" },
    },
    children: {
      description: "Additional content to be displayed",
      control: { type: "node" },
    },
  },
};

export default meta;

export const Default: StoryObj<TMainHeaderProps> = {
  args: {
    setCollapsed: () => {}, // Provide any mock function for setCollapsed
    collapsed: false,
    children: <div>Your additional content goes here</div>,
    info: {
      fullname: "John Doe",
      roles: [{ name: "Admin" }, { name: "User" }],
    },
  },
};
