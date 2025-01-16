import { Page, Section } from "admiral";
import { Descriptions } from "antd";

import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useGetDetailRole } from "../_hooks/use-get-detail-role";

export const Component = () => {
  const params = useParams();
  const roleId = typeof params.id === "string" ? params.id : "";
  const roleQuery = useGetDetailRole(roleId);

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Role",
      path: "/iam/roles",
    },
    {
      label: roleQuery.data?.data.name ?? "",
      path: "#",
    },
  ];

  return (
    <Page title="Detail Role" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={roleQuery.isLoading} title="Detail Role">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name" key="name">
            {roleQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Key" key="key">
            {roleQuery.data?.data.key}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Permissions" key="permissions">
            {roleQuery.data?.data.permissions
              ?.map((role) => role.name)
              .join(", ")}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Created At" key="created_at">
            {roleQuery.data?.data.created_at
              ? dayjs(roleQuery.data?.data.created_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At" key="updated_at">
            {roleQuery.data?.data.updated_at
              ? dayjs(roleQuery.data?.data.updated_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};
