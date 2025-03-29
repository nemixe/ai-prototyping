import { Meta, StoryObj } from "@storybook/react";
import CompanyLogo from ".";

const meta: Meta = {
  title: "Design System/CompanyLogo/Default",
  component: CompanyLogo,
  tags: ["autodocs"],
  argTypes: {
    src: {
      description: "The URL of the image to display.",
      control: {
        type: "text",
      },
    },
    alt: {
      description: "The alt text for the image.",
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `CompanyLogo` component is used to display a company logo.",
      },
      source: {
        code: `<CompanyLogo src="https://via.placeholder.com/150" alt="Company Logo" />`,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    src: "https://static-00.iconduck.com/assets.00/ant-design-icon-2048x2046-dl3neb73.png",
    alt: "Company Logo",
    style: { width: "36px" },
  },
};
