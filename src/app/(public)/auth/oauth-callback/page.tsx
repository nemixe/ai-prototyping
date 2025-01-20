import { useEffect } from "react";
import { Flex, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AccessTokenCookies } from "@/libs/cookies";
import { usePostLoginOidc } from "./_hooks/use-post-login-oidc";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const { mutate } = usePostLoginOidc();

  const signInCallback = async () => {
    const code = searchParams[0].get("code");
    if (!code) return navigate("/auth/login");
    mutate({ code });
  };

  useEffect(() => {
    signInCallback();
  }, []);

  useEffect(() => {
    const session = AccessTokenCookies.get();
    if (session) navigate(ROUTES.dashboard);
  }, []);

  return (
    <Flex
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      gap={16}
      vertical
    >
      <Spin />
      Redirecting...
    </Flex>
  );
};
