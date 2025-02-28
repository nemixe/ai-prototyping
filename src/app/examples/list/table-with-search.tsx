import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import Datatable from "admiral/table/datatable/index";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { Page } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";

import { useDeleteRole, useGetRoles } from "../hook";
import { TRoleItem } from "../type";

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
              to={urlParser("/users/detail/:id", {
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
              to={urlParser("/users/update/:id", {
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
      path: "/dashboard",
    },
    {
      label: "Users",
      path: "/users",
    },
  ];

  return (
    <Page title="Users" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
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
  <Link to={"/users/create"}>
    <Button icon={<PlusCircleOutlined />}>Add User</Button>
  </Link>
);

export default Component;
