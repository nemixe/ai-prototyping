import { Col, Row, message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";
import { FormUser } from "./form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Users",
      path: "/users",
    },
    {
      label: "Create User",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    navigate("/users");
    message.success("User successfully created");
  };

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
        </Col>
      </Row>
    </Page>
  );
};

export default Component;
