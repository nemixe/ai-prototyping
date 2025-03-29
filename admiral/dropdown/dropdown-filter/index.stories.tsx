import { Meta, StoryObj } from "@storybook/react";
import DropdownFilter, { TDropdownFilterProps } from "./index";
import { Checkbox, DatePicker, Form, Input } from "antd";

const meta: Meta<TDropdownFilterProps> = {
  title: "Design System/DropdownFilter/Default",
  component: DropdownFilter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `DropdownFilter` component is used to provide component for nested dropdown filter.",
      },
    },
  },
  argTypes: {
    children: {
      description:
        "The child components that will be wrapped by the DropdownFilter. This is where you can place your form components.",
      control: "object",
    },
  },
};

export default meta;

export const Default: StoryObj<TDropdownFilterProps> = {
  render: () => (
    <DropdownFilter>
      <Form.Item label="PO Number" name="poNumber">
        <Input type="text" placeholder="Input PO Number" />
      </Form.Item>
      <Form.Item label="Invoice Date" name="date">
        <DatePicker.RangePicker
          format={"DD MMMM YYYY HH:mm:ss"}
          placeholder={["Select start invoice date", "Select end invoice date"]}
        />
      </Form.Item>
      <Form.Item label="Receive Date" name="date">
        <DatePicker.RangePicker
          format={"DD MMMM YYYY HH:mm:ss"}
          placeholder={["Select start receive date", "Select end receive date"]}
        />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Checkbox.Group>
          <Checkbox value="Paid">Paid</Checkbox>
          <Checkbox value="Pending">Pending</Checkbox>
          <Checkbox value="Unpaid">Unpaid</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </DropdownFilter>
  ),
};
