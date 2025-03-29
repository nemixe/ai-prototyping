import { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, TThemeProviderProps } from "./theme";

const meta: Meta<TThemeProviderProps> = {
  title: "Design System/ThemeProvider/Default",
  component: ThemeProvider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `ThemeProvider` component is used to provide a consistent theme across your application. It uses Ant Design's `ConfigProvider` to apply theme settings and a context to manage custom tokens.",
      },
    },
  },
  argTypes: {
    children: {
      description:
        "The child components that will be wrapped by the ThemeProvider.",
      control: { type: "none" },
    },
    theme: {
      description:
        "The theme configuration object that customizes the theme tokens.",
      control: "object",
    },
  },
};

export default meta;

export const Default: StoryObj<TThemeProviderProps> = {
  args: {
    children: <div>Your component goes here</div>,
    theme: {
      components: {
        Tabs: {},
      },
      admiral: {
        Header: {
          colorBg: "white",
          colorText: "blue",
        },
        Sidebar: {
          colorBg: "white",
          colorText: "black",
        },
        DataTable: {
          size: [5, 10, 20, 50, 100],
          placeholderSearch: "Search",
        },
        Page: {
          NavigationAs: undefined,
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This is the default configuration of the ThemeProvider. You can customize the theme prop to change the theme settings.",
      },
    },
  },
};
