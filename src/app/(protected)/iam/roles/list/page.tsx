import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import { makeSource } from "@/utils/data-table";
import dayjs from "dayjs";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { Link, useNavigate } from "react-router-dom";
import { useGetRoles } from "../_hooks/use-get-roles";
import { useDeleteRole } from "../_hooks/use-delete-role";
import { TRoleItem } from "@/api/role/type";
import { urlParser } from "@/utils/url-parser";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const navigate = useNavigate();
  const { handleChange, pagination, filters } = useFilter();

  const rolesQuery = useGetRoles(pagination);

  const deleteRoleMutation = useDeleteRole();

  const columns: ColumnsType<TRoleItem> = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "permissions",
      title: "Permissions",
      key: "permissions",
      render: (_, record) => {
        return record.permissions?.map((role) => role.name).join(", ");
      },
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      key: "createdAt",
      render: (_, record) => {
        return record.created_at ? dayjs(record.created_at).format("DD/MM/YYYY") : "-";
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser(ROUTES.iam.roles.detail, {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                deleteRoleMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success("Role berhasil dihapus");
                    navigate(0);
                  },
                });
              }}
            />
            <Link
              to={urlParser(ROUTES.iam.roles.update, {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
    },
    {
      label: "Roles",
      path: ROUTES.iam.roles.list,
    },
  ];

  return (
    <Page title="Roles" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={rolesQuery.isLoading}
        source={makeSource(rolesQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};

const TopAction = () => (
  <Link to={ROUTES.iam.roles.create}>
    <Button icon={<PlusCircleOutlined />}>Add Role</Button>
  </Link>
);
