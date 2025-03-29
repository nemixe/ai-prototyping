import type { Meta, StoryObj } from "@storybook/react";

import Tabs from "./index";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ["autodocs"],
  title: "Design System/Tabs/Default",
  parameters: {
    docs: {
      description: {
        component:
          "Tabs component is used to navigate between different sections of content.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Tab items",
      defaultValue: [
        {
          key: "1",
          label: "Tab 1",
          children: "Content of Tab 1",
        },
        {
          key: "2",
          label: "Tab 2",
          children: "Content of Tab 2",
        },
        {
          key: "3",
          label: "Tab 3",
          children: "Content of Tab 3",
        },
      ],
    },
    tabPosition: {
      description: "Position of the tabs",
      control: "radio",
      default: "top",
      options: ["top", "left", "right", "bottom"],
    },
    type: {
      description: "Type of the tabs",
      control: "radio",
      default: "line",
      options: ["line", "card", "bordered-card"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {
    items: [
      {
        key: "1",
        label: "Tab 1",
        children: "Content of Tab 1",
      },
      {
        key: "2",
        label: "Tab 2",
        children: "Content of Tab 2",
      },
      {
        key: "3",
        label: "Tab 3",
        children: "Content of Tab 3",
      },
    ],
  },
};
