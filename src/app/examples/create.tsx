import { Col, Row, message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormRole } from "./form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: "Create Role",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Role berhasil dibuat");
    navigate("/roles");
  };

  return (
    <Page title="Add Role" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRole formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
        </Col>
      </Row>
    </Page>
  );
};

export default Component;
