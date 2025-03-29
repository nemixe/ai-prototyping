import type { Meta, StoryFn } from "@storybook/react";
import TextEditor from "./index";
import React from "react";

export default {
  title: "Design System/Input/TextEditor",
  component: TextEditor,
} as Meta<typeof TextEditor>;

const Template: StoryFn<typeof TextEditor> = (args) => {
  const [value, setValue] = React.useState(args.value);

  const handleChange = (value: string) => {
    setValue(value);
    args?.onChange?.(value);
  };

  return <TextEditor {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  onChange: (value) => console.log("Content updated:", value),
};
