import { RowProps, SpaceProps, theme as antTheme } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import { useContext, type CSSProperties } from "react";
import { TThemeConfig, ThemeContext } from "../context";

export const themeColors = {
  primary: "#006D75",
  secondary: "",
  success: "",
  warning: "",
  error: "#FF4D4F",
  info: "#FFF",
};

export const darkThemeColors = {
  primary: "#001213",
};

export const iconActionTableStyle: CSSProperties = {
  color: themeColors.primary,
  fontSize: "14px",
};

export const sidebarThemeConfig: TThemeConfig = {
  components: {
    Menu: {
      itemColor: "#001213",
      itemSelectedColor: "#FF6868",
      itemHoverBg: "#525CEB",
      itemHoverColor: "#FF6868",
      itemSelectedBg: "#001213",
      fontSize: 14,
      horizontalItemSelectedColor: "#FF6868",
    },
    Layout: {
      headerColor: "#001213",
      headerBg: "#FFF",
    },
  },
  admiral: {
    Header: {
      colorBg: "white",
      colorText: "black",
    },
    Sidebar: {
      colorBg: "#001D66",
      colorText: "white",
    },
  },
};

export const defaultGutter: RowProps["gutter"] = [16, 16];

export const defaultSizeSpace: SpaceProps["size"] = "middle";

export const globalThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: themeColors.primary,
  },
  components: {
    Table: {
      controlItemBgActive: "#E6FFFB",
      controlItemBgActiveHover: "#E6FFFB",
    },
  },
};

const useToken = () => {
  const token = antTheme.useToken();
  const { token: admiralToken, ...theme } = useContext(ThemeContext);

  return {
    ...token,
    ...theme,
    admiral: admiralToken,
  };
};

export const theme = {
  ...antTheme,
  useToken,
};
