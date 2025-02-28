import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";

import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router";
import { urlParser } from "@/utils/url-parser";
import { useDeleteRole, useGetDetailRole } from "./hook";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const roleId = typeof params.id === "string" ? params.id : "";
  const roleQuery = useGetDetailRole(roleId);
  const deleteRoleMutation = useDeleteRole();

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
      label: roleQuery.data?.data.name ?? "",
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
              deleteRoleMutation.mutate(roleQuery.data?.data.id ?? "", {
                onSuccess: () => {
                  message.success("Role berhasil dihapus");
                  navigate("/roles");
                },
              });
            }}
          >
            Delete
          </Button>
          <Link
            to={urlParser("/roles/update/:id", {
              id: Number(roleQuery.data?.data.id),
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
      <Section loading={roleQuery.isLoading} title="Detail Role">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name" key="name">
            {roleQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Key" key="key">
            {roleQuery.data?.data.key}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Permissions" key="permissions">
            {roleQuery.data?.data.permissions?.map((role) => role.name).join(", ")}
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

export default Component;
