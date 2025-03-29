import { Meta, StoryObj } from "@storybook/react";
import { CarOutlined } from "@ant-design/icons";

import UploaderComponent from "./index";

const meta: Meta<typeof UploaderComponent> = {
  title: "Design System/Uploader/Default",
  component: UploaderComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Uploader component is used to upload files.",
      },
    },
  },
  argTypes: {
    text: {
      description: "Text to display",
      control: {
        type: "text",
      },
    },
    hint: {
      description: "Hint to display",
      control: {
        type: "text",
      },
    },
    icon: {
      description: "Icon to display",
      control: {
        type: { name: "none" },
      },
    },
  },
};

export default meta;

export const Uploader: StoryObj<typeof UploaderComponent> = {
  args: {
    text: "Click or drag file to this area to upload",
    hint: "Just Single Upload",
  },
};

export const UploaderCustomIcon: StoryObj<typeof UploaderComponent> = {
  args: {
    icon: <CarOutlined />,
  },
  parameters: {
    docs: {
      description: {
        story: "Uploader component with custom icon",
      },
    },
  },
};
