import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";

import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";

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
          >
            Delete
          </Button>
          <Link
            to={urlParser("/roles/update/:id", {
              id: Number(role.data.data.id),
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title="Detail Role"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <Section loading={role.loading} title="Detail Role">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name" key="name">
            {role.data.data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Key" key="key">
            {role.data.data?.key}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Permissions" key="permissions">
            {role.data.data?.permissions?.map((role) => role.name).join(", ")}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Created At" key="created_at">
            {role.data.data?.created_at
              ? dayjs(role.data.data?.created_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At" key="updated_at">
            {role.data.data?.updated_at
              ? dayjs(role.data.data?.updated_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
