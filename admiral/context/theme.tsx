import { ConfigProvider, theme as antTheme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";
import React, { createContext } from "react";
import { useCookies } from "react-cookie";
import { TBreadcrumbsItem } from "../breadcrumb";
import { merge } from "../util/merge";

export type TAdmiralToken = {
  Header: {
    colorBg: string;
    colorText: string;
  };
  Sidebar: {
    colorBg: string;
    colorText: string;
  };
  DataTable: {
    size: number[];
    placeholderSearch?: string;
  };
  Page?: {
    NavigationAs?: (props: TBreadcrumbsItem) => JSX.Element;
  };
};

export type TThemeContext = {
  isDarkMode: boolean;
  setDarkMode: (boolean: boolean) => void;
  token: TAdmiralToken;
};

export type TThemeConfig = ThemeConfig & { admiral?: Partial<TAdmiralToken> };

export type TThemeProviderProps = {
  children: React.ReactNode;
  theme?: TThemeConfig;
};

const defaultValueContext: TThemeContext = {
  isDarkMode: false,
  setDarkMode: () => {},
  token: {
    Header: {
      colorBg: "white",
      colorText: "black",
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
};

export const ThemeContext = createContext<TThemeContext>(defaultValueContext);

export const ThemeProvider: React.FunctionComponent<TThemeProviderProps> = (
  props,
) => {
  const [cookies, setCookies] = useCookies(["darkMode"]);

  const setDarkMode = (isDarkMode: boolean) => {
    setCookies("darkMode", isDarkMode, { path: "/" });
  };

  const { darkAlgorithm, defaultAlgorithm } = antTheme;

  const themeAlgorithm = cookies.darkMode ? darkAlgorithm : defaultAlgorithm;

  const { admiral, ...theme } = {
    ...(props.theme || {}),
    algorithm: themeAlgorithm,
  };

  const admiralToken = merge(defaultValueContext.token, admiral || {});

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        token: admiralToken,
        isDarkMode: cookies.darkMode == "true",
        setDarkMode,
      }}
    >
      <ConfigProvider theme={theme}>{props.children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
