import { Button, Col, Row, Space, Typography } from "antd";
import { useIsMobileScreen } from "admiral";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "@/app/_components/ui/session-provider";

export const Component: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isMobile = useIsMobileScreen();

  const redirectUrl = new URL(
    "/auth/oauth-callback",
    import.meta.env.VITE_BASE_URL,
  );

  const authFusionLoginUrl = new URL(
    `/oauth2/authorize?client_id=${import.meta.env.VITE_AUTH_FUSION_ID}&redirect_uri=${redirectUrl.toString()}&response_type=code&tenantId=${import.meta.env.VITE_AUTH_FUSION_TENANT_ID}`,
    import.meta.env.VITE_AUTH_FUSION_ISSUER_URL,
  );

  useEffect(() => {
    if (session.status === "authenticated")
      navigate(searchParams.get("callbackUrl") || "/dashboard");
  }, []);

  return (
    <Row align="middle" justify="center" style={{ height: "80vh" }}>
      <Col span={24} style={{ padding: `4rem ${isMobile ? "" : "7rem"}` }}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography.Title level={4}>Welcome back!</Typography.Title>
          <Typography.Text style={{ opacity: 0.5 }}>
            Ant Design is the most influential web design specification in Xihu
            district
          </Typography.Text>
        </Space>
        <Button
          href={authFusionLoginUrl.toString()}
          type="primary"
          htmlType="button"
          style={{ width: "100%" }}
        >
          Log in with SSO
        </Button>
      </Col>
    </Row>
  );
};
