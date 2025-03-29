import { Meta, StoryObj } from "@storybook/react";
import Breadcrumbs, { PropsBreadcrumb } from ".";

const meta: Meta<PropsBreadcrumb> = {
  title: "Design System/Breadcrumb/Default",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {
    breadcrumbs: {
      description:
        "Breadcrumb component can use on pageHeader with using PropsBreadCrumb",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `Breadcrumb` component is used to provide component for nested breadcrumb.",
      },
    },
  },
};

export default meta;

export const DefaultBreadcrumb: StoryObj<PropsBreadcrumb> = {
  args: {
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Category", path: "/category" },
      { label: "Product", path: "/" },
    ],
  },
  render: (args: PropsBreadcrumb) => <Breadcrumbs {...args} />,
};

export const CustomBreadcrumb: StoryObj<PropsBreadcrumb> = {
  args: {
    items: [
      {
        title: "Ant Design",
      },
      {
        title: <a href="/components">Component</a>,
      },
      {
        title: <a href="#">General</a>,
        menu: {
          items: [
            {
              key: "1",
              label: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.alipay.com/"
                >
                  General
                </a>
              ),
            },
            {
              key: "2",
              label: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.taobao.com/"
                >
                  Layout
                </a>
              ),
            },
            {
              key: "3",
              label: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.tmall.com/"
                >
                  Navigation
                </a>
              ),
            },
          ],
        },
      },
      {
        title: "Button",
      },
    ],
  },
  render: (args: PropsBreadcrumb) => <Breadcrumbs {...args} />,
};
