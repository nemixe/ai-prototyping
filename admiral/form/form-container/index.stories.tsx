import { Meta, StoryObj } from "@storybook/react";
import FormContainer from "./index";
import { Form, Input } from "antd";

const meta: Meta<typeof FormContainer> = {
  title: "Design System/Form/FormContainer",
  component: FormContainer,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description:
        "The child components that will be wrapped by the FormContainer. This is where you can place your form components.",
      control: {
        type: { type: "none" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `FormContainer` component is used to provide a container for form components.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof FormContainer> = {
  render: () => (
    <FormContainer>
      <Form.Item label="Email" name="email" required>
        <Input type="email" placeholder="Input" />
      </Form.Item>

      <Form.Item label="Password" name="password" required>
        <Input.Password />
      </Form.Item>
    </FormContainer>
  ),
};
