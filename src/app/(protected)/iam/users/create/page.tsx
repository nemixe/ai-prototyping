"use client";

import { FormUser } from "../list/form-user";
import { UserFormData } from "../list/form-user/schema";
import { Page } from "admiral";
import { Col, Row, message } from "antd";
import { useCreateUserMutation } from "./_hooks/use-create-user-mutation";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Users",
      path: "/iam/users",
    },
    {
      label: "Create User",
      path: "#",
    },
  ];

  const createUserMutation = useCreateUserMutation();

  const handleOnFinish = (data: UserFormData) =>
    createUserMutation.mutate(data, {
      onSuccess: () => {
        message.success("User berhasil dibuat");
        navigate("/iam/users");
      },
      onError: () => {
        message.error("User gagal dibuat");
      },
    });

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
