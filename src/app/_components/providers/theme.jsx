import { ThemeProvider as AdmiralThemeProvider } from "admiral";
import { Link, Outlet } from "react-router";

const theme = {
  components: {
    Menu: {
      itemColor: "#B5F5EC",
      itemSelectedColor: "#B5F5EC",
      itemHoverBg: "#08979C",
      itemHoverColor: "#B5F5EC",
      itemSelectedBg: "#08979C",
      fontSize: 14,
      horizontalItemSelectedColor: "#08979C",
    },
    Layout: {
      headerColor: "#001213",
      headerBg: "#FFF",
    },
  },
  token: {
    colorPrimary: "#006D75",
    colorLink: "#006D75",
  },
  admiral: {
    Sidebar: {
      colorBg: "#006D75",
      colorText: "#B5F5EC",
    },
    Page: {
      NavigationAs: ({ path, label }) => <Link to={path}>{label}</Link>,
    },
  },
};

const ThemeProvider = () => {
  return (
    <AdmiralThemeProvider theme={theme}>
      <Outlet />
    </AdmiralThemeProvider>
  );
};

export default ThemeProvider;
