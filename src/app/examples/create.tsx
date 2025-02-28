import { Col, Row, message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";
import { FormRole } from "./form";
import { usePostCreateRole } from "./hook";

type RoleFormData = {
  name: string;
  roleKey: string;
  permissions_ids: string[];
};

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

  const createRoleMutation = usePostCreateRole();

  const handleOnFinish = (data: RoleFormData) => {
    const payload = {
      name: data.name,
      key: data.roleKey,
      permissions_ids: data.permissions_ids,
    };
    createRoleMutation.mutate(payload, {
      onSuccess: () => {
        message.success("Role berhasil dibuat");
        navigate("/roles");
      },
      onError: () => {
        message.error("Role gagal dibuat");
      },
    });
  };

  return (
    <Page title="Add Role" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRole
            formProps={{ onFinish: handleOnFinish }}
            error={createRoleMutation.error}
            loading={createRoleMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Component;
