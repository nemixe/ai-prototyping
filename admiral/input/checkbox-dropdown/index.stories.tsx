import { Meta, StoryObj } from "@storybook/react";
import { CheckboxDropdown as CheckboxDropdownComponent } from "./index";

const meta: Meta<typeof CheckboxDropdownComponent> = {
  title: "Design System/Input/CheckboxDropdown",
  component: CheckboxDropdownComponent,
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "The options to display in the dropdown.",
      control: {
        type: "object",
      },
    },
    value: {
      description: "The selected value(s) of the dropdown.",
      control: {
        type: "object",
      },
    },
    placeholder: {
      description: "The placeholder text to display in the dropdown.",
      control: {
        type: "text",
      },
    },
    onChange: {
      description: "The function to call when the value changes.",
      action: "changed",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `CheckboxDropdown` component is used to display a dropdown with checkboxes.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof CheckboxDropdownComponent> = {
  args: {
    placeholder: "dropdown",
    options: [
      { label: "Checkbox 1", value: "checkbox 1" },
      { label: "Checkbox 2", value: "checkbox 2" },
    ],
    value: ["checkbox 1"],
  },
};
