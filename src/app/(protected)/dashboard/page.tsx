import { ROUTES } from "@/commons/constants/routes";
import { AccessTokenCookies, RefreshTokenCookies, UserCookies } from "@/libs/cookies";
import { Page } from "admiral";
import { Button } from "antd";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const Component: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handleLogout = () => {
    UserCookies.remove();
    AccessTokenCookies.remove();
    RefreshTokenCookies.remove();
    navigate(ROUTES.auth.login);
  };
  return (
    <Page title="Dashboard">
      <h1>Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Page>
  );
};
