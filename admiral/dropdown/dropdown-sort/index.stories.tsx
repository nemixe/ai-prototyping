import { Meta, StoryObj } from "@storybook/react";
import DropdownSort, { TSortFilterProps } from "./index";

const meta: Meta<TSortFilterProps> = {
  title: "Design System/DropdownSort/Default",
  component: DropdownSort,
  tags: ["autodocs"],
  argTypes: {
    columnOptions: {
      description:
        "Column options that will be displayed in the dropdown. Each option should have a value and a label.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `DropdownSort` component is used to provide component for nested dropdown sort.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<TSortFilterProps> = {
  args: {
    columnOptions: [
      { value: "jack", label: "Jack" },
      { value: "lucy", label: "Lucy" },
      { value: "Yiminghe", label: "Yiminghe" },
    ],
  },
};
