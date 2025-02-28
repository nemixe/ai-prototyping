import { Page } from "admiral";
import { Col, Row, message } from "antd";
import { useNavigate, useParams } from "react-router";
import { urlParser } from "@/utils/url-parser";

import { FormRole } from "./form";
import { TRoleDetailResponse } from "./type";

const getRole = (id: string): TRoleDetailResponse => {
  return {
    status_code: 200,
    data: {
      permissions: [
        {
          name: "View Role",
          key: "view-role",
          id: "145efcff-8ae5-4a6c-9900-05a855000622",
          created_at: null,
          updated_at: null,
          deleted_at: null,
        },
      ],
      name: "Super Admin",
      key: "super-admin",
      id: id,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    version: "1.0.0",
  };
};

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const roleId = typeof params.id === "string" ? params.id : "";

  const roleQuery = getRole(roleId);

  const handleOnFinish = () => {
    navigate("/roles");
    message.success("Role berhasil diupdate");
  };

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
      label: roleQuery.data?.name ?? "-",
      path: urlParser("/roles/detail/:id", { id: roleQuery.data?.id ?? "" }),
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    name: roleQuery.data?.name,
    roleKey: roleQuery.data?.key,
    permissions_ids: roleQuery.data?.permissions?.map((role) => ({
      label: role.name,
      value: role.id,
    })),
  };

  return (
    <Page title="Update Role" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRole
            key={roleQuery.data?.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues,
              disabled: false,
            }}
            error={null}
            loading={false}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Component;
