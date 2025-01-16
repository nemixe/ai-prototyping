"use client";

import { Page } from "admiral";
import { Col, Row, message } from "antd";
import { useUpdateUserMutation } from "./_hooks/use-update-user-mutation";
import { TUserUpdateRequest } from "@/api/user/type";
import { FormUser } from "../list/form-user";
import { useUserQuery } from "../_hooks/use-user-query";
import { useNavigate, useParams } from "react-router-dom";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userId = typeof params.id === "string" ? params.id : "";

  const userQuery = useUserQuery(userId);

  const updateUserMutation = useUpdateUserMutation(userId);

  const handleOnFinish = (data: TUserUpdateRequest) =>
    updateUserMutation.mutate(data, {
      onSuccess: () => {
        navigate("/iam/users");
        message.success("User berhasil diupdate");
      },
      onError: () => {
        message.error("User gagal diupdate");
      },
    });

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
      label: userQuery.data?.data.name ?? "",
      path: `/iam/users/${userQuery.data?.data.id}`,
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  return (
    <Page title="Update User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{
              onFinish: handleOnFinish,
              initialValues: userQuery.data,
              disabled: userQuery.isLoading,
            }}
            error={updateUserMutation.error}
            loading={updateUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
