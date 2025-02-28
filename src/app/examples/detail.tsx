import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";

import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router";
import { urlParser } from "@/utils/url-parser";
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
  const roleData = getRole(roleId);

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
      label: roleData.data.name,
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
              id: Number(roleData.data?.id),
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
      <Section loading={false} title="Detail Role">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name" key="name">
            {roleData.data?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Key" key="key">
            {roleData.data?.key}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Permissions" key="permissions">
            {roleData.data?.permissions?.map((role) => role.name).join(", ")}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Created At" key="created_at">
            {roleData.data?.created_at
              ? dayjs(roleData.data?.created_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At" key="updated_at">
            {roleData.data?.updated_at
              ? dayjs(roleData.data?.updated_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
