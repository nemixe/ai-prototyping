import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";

import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";
import { Typography } from "antd";

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

const Component = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: role.data.data.name,
      path: "#",
    },
  ];

  const items = [
    {
      key: "name",
      label: "Name",
      children: <Typography.Text strong>{role.data.data.name ?? "-"}</Typography.Text>,
    },
    {
      key: "key",
      label: "Key",
      children: <Typography.Text strong>{role.data.data.key ?? "-"}</Typography.Text>,
    },
    {
      key: "permissions",
      label: "Permissions",
      children: (
        <Typography.Text strong>
          {role.data.data?.permissions?.map((role) => role.name).join(", ")}
        </Typography.Text>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      children: (
        <Typography.Text strong>
          {role.data.data?.created_at
            ? dayjs(role.data.data?.created_at).format("DD/MM/YYYY")
            : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: (
        <Typography.Text strong>
          {role.data.data?.updated_at
            ? dayjs(role.data.data?.updated_at).format("DD/MM/YYYY")
            : "-"}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              message.success("Role berhasil dihapus");
              navigate("/roles");
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={urlParser("/roles/:id/update", {
              id: Number(role.data.data.id),
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Detail Role ${role.data.data.name}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/roles")}
      noStyle
    >
      <Section loading={role.loading}>
        <Section title="General Information">
          <Descriptions
            bordered
            layout="horizontal"
            items={items}
            column={{
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
          />
        </Section>
      </Section>
    </Page>
  );
};

export default Component;
