import { Meta, StoryObj } from "@storybook/react";
import InputCurrency from "./index";

const meta: Meta<typeof InputCurrency> = {
  title: "Design System/Input/InputCurrency",
  component: InputCurrency,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "InputCurrency is a component for inputting currency values.",
      },
    },
  },
  argTypes: {
    locale: {
      control: "radio",
      options: ["id", "en"],
      description: "Locale for number formatting",
      defaultValue: "id",
    },
    prefix: {
      control: "text",
      description: "Prefix for the input (e.g., Rp, $)",
      defaultValue: "Rp",
    },
    value: {
      control: "number",
      description: "Initial value for the input",
      defaultValue: 10000,
    },
    style: {
      control: "object",
      description: "CSS properties for the input style",
    },
    onChange: { action: "changed" },
  },
};

export default meta;

export const Default: StoryObj<typeof InputCurrency> = {
  args: {
    locale: "id",
    prefix: "Rp",
    value: 10000,
    style: { width: 200 },

    onChange: (e) => console.log(e.target.value),
  },
};

export const EnglishLocale: StoryObj<typeof InputCurrency> = {
  args: {
    locale: "en",
    prefix: "$",
    value: 10000,
    style: { width: 200 },

    onChange: (e) => console.log(e.target.value),
  },
};

export const CustomStyle: StoryObj<typeof InputCurrency> = {
  args: {
    locale: "id",
    prefix: "Rp",
    value: 10000,
    style: { width: 300, borderColor: "blue" },

    onChange: (e) => console.log(e.target.value),
  },
};
