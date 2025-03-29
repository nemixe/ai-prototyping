import { Meta, StoryObj } from "@storybook/react";
import Menu from ".";
import { Button, Flex } from "antd";

const meta: Meta<typeof Menu.Dropdown> = {
  title: "Design System/Menu/Default",
  component: () => <Menu />,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Menu component can be use on Main Layout, the Menu.Dropdown component is using Popover Antd componeent. You can refer to the Antd Popover documentation for more customization.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Menu.Dropdown> = {
  render: () => (
    <Flex justify="center">
      <Menu>
        <Menu.Dropdown
          title="Notification"
          moreText={
            <span
              style={{
                color: "#000000A6",
                fontWeight: "400",
              }}
            >
              More
            </span>
          }
          label={<Button>Click Me</Button>}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quo odio
          nihil odit? Doloremque esse repudiandae vel veritatis, ab
          exercitationem.
        </Menu.Dropdown>
      </Menu>
    </Flex>
  ),
};
