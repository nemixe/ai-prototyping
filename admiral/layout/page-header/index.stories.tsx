import { Meta, StoryObj } from "@storybook/react";
import { IPageHeaderProps, PageHeader } from ".";

const meta: Meta<IPageHeaderProps> = {
  title: "Design System/Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "PageHeader is a component for displaying a header for a page.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title for the page",
      defaultValue: "Page Header",
    },
    topActions: {
      control: "node",
      description: "Additional content for the header",
    },
    breadcrumbs: {
      control: "object",
      description: "Breadcrumbs to be displayed",
    },
  },
};

export default meta;

export const Default: StoryObj<IPageHeaderProps> = {
  args: {
    title: "Page Header",
  },
};
