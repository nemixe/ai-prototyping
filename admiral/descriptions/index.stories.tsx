import { Meta, StoryObj } from "@storybook/react";
import Descriptions from ".";

const meta: Meta<typeof Descriptions> = {
  title: "Design System/Descriptions/Default",
  component: Descriptions,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Descriptions component is using Descriptions Antd component but with default styling. You can refer to the Antd Description documentation for more customization",
      },
    },
  },
  argTypes: {
    children: {
      description:
        "The child components that will be wrapped by the Descriptions.",
      control: { type: "none" },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Descriptions> = {
  render: () => (
    <Descriptions>
      <Descriptions.Item label="UserName of Some Instituions in The World">
        Zhou Maomao
      </Descriptions.Item>
      <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
      <Descriptions.Item label="Live">
        Hangzhou, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Rerum culpa inventore aperiam optio totam alias.
      </Descriptions.Item>
      <Descriptions.Item label="Remark">empty</Descriptions.Item>
      <Descriptions.Item label="Email">Hangzhou@gmail.com</Descriptions.Item>
      <Descriptions.Item label="Category">Entertainment</Descriptions.Item>
    </Descriptions>
  ),
};
