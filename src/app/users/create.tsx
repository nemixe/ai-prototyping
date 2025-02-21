import { Col, Row, message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";
import { UserFormData } from "./schema";
import { FormUser } from "./form";
import { usePostCreateUser } from "./hook";

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

  const createUserMutation = usePostCreateUser();

  const handleOnFinish = (data: UserFormData) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        message.success("User successfully created");
        navigate("/users");
      },
      onError: () => {
        message.error("Failed to create user");
      },
    });
  };

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{ onFinish: handleOnFinish }}
            error={createUserMutation.error}
            loading={createUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Component;
