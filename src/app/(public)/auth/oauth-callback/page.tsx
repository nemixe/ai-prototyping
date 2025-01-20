import { useEffect } from "react";
import { Flex, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { SessionCookies } from "@/libs/cookies";
import { useSession } from "@/app/_components/providers/session";

export const Component = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const { signin } = useSession();

  const signInCallback = async () => {
    const code = searchParams[0].get("code");
    if (!code) return navigate("/auth/login");
    signin({ code });
  };

  useEffect(() => {
    signInCallback();
  }, []);

  useEffect(() => {
    const session = SessionCookies.get();
    if (session) navigate(ROUTES.DASHBOARD.URL);
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
