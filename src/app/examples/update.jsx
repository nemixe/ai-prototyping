import { Page } from "admiral";
import { Col, Row, message } from "antd";
import { useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";

import { FormRole } from "./form";

const role = {
  data: {
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
      id: "1",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    version: "1.0.0",
  },
  loading: false,
};

export const Component = () => {
  const navigate = useNavigate();

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
      label: role.data.data?.name ?? "-",
      path: urlParser("/roles/detail/:id", { id: role.data.data?.id ?? "" }),
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    name: role.data.data?.name,
    roleKey: role.data.data?.key,
    permissions_ids: role.data.data?.permissions?.map((role) => ({
      label: role.name,
      value: role.id,
    })),
  };

  return (
    <Page
      title={`Update Role ${role.data.data.name}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/roles")}
    >
      <FormRole
        isEdit
        key={role.data.data?.id}
        formProps={{
          onFinish: handleOnFinish,
          initialValues,
          disabled: false,
        }}
        error={null}
        loading={role.loading}
      />
    </Page>
  );
};

export default Component;
