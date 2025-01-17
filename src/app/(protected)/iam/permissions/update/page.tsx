import { Col, Row, message } from "antd";
import { Page } from "admiral";

import { usePermissionQuery } from "../_hooks/use-permission-query";
import { useUpdatePermissionMutation } from "./_hooks/use-update-permission-mutation";
import { useNavigate, useParams } from "react-router-dom";
import { FormPermission } from "../_components/form-permission";
import { PermissionFormData } from "../_components/form-permission/schema";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const permissionId = typeof params.id === "string" ? params.id : "";

  const permissionQuery = usePermissionQuery(permissionId);

  const updatePermissionMutation = useUpdatePermissionMutation(permissionId);

  const handleOnFinish = (data: PermissionFormData) =>
    updatePermissionMutation.mutate(
      { id: permissionId, ...data },
      {
        onSuccess: () => {
          navigate("/iam/permissions");
          message.success("Permission berhasil diupdate");
        },
        onError: () => {
          message.error("Permission gagal diupdate");
        },
      }
    );

  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Permissions",
      path: "/iam/permissions",
    },
    {
      label: permissionQuery.data?.data.name ?? "",
      path: `/iam/permissions/${permissionQuery.data?.data.id}`,
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    name: permissionQuery.data?.data.name,
    permissionKey: permissionQuery.data?.data.key,
  };

  return (
    <Page title="Update Permission" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormPermission
            key={permissionQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues,
              disabled: permissionQuery.isLoading,
            }}
            error={updatePermissionMutation.error}
            loading={updatePermissionMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
