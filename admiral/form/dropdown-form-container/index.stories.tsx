import { Meta, StoryObj } from "@storybook/react";
import { Button, Card, Dropdown, Flex, Form, Input } from "antd";
import DropdownFormContainer from ".";
import { DeleteOutlined, FilterOutlined } from "@ant-design/icons";

const meta: Meta<typeof DropdownFormContainer> = {
  title: "Design System/Form/DropdownFormContainer",
  component: DropdownFormContainer,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description:
        "The child components that will be wrapped by the DropdownFormContainer. This is where you can place your form components.",
      control: { type: "none" },
    },
    type: {
      description: "The type of the form layout.",
      control: { type: "select", options: ["default"] },
    },
    style: {
      description: "Additional CSS styles to apply to the form.",
      control: { type: "object" },
    },
    initialValues: {
      description: "Initial values for the form fields.",
      control: { type: "object" },
    },
    onFinish: {
      description: "Callback function to handle form submission.",
      action: "submitted",
    },
    layout: {
      description: "Layout of the form.",
      control: {
        type: "select",
        options: ["horizontal", "vertical", "inline"],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `DropdownFormContainer` component is used to provide component for nested dropdown form.",
      },
    },
  },
};

export default meta;

const onFinish = (values: unknown) => {
  console.log("Received values:", values);
};

export const Default: StoryObj<typeof DropdownFormContainer> = {
  render: () => (
    <DropdownFormContainer onFinish={onFinish}>
      <Dropdown
        dropdownRender={(): React.ReactElement => (
          <Card>
            <DropdownFormContainer
              type="default"
              initialValues={{ name: "John Doe" }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item label="Name" name="name" required>
                <Input type="text" placeholder="name" />
              </Form.Item>
            </DropdownFormContainer>
            <Flex wrap="wrap" gap={"small"} justify="flex-end">
              <Button icon={<DeleteOutlined />}>Clear</Button>
              <Button type="primary" icon={<FilterOutlined />}>
                Apply
              </Button>
            </Flex>
          </Card>
        )}
      >
        <Button icon={<FilterOutlined />}>Filter</Button>
      </Dropdown>
    </DropdownFormContainer>
  ),
};
