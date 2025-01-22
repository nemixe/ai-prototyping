"use client";

import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { DataTable, Page } from "admiral";

import { makeSource } from "@/utils/data-table";

import { useDeletePermissionMutation } from "./_hooks/use-delete-permission-mutation";
import { usePermissionsQuery } from "./_hooks/use-permissions-query";
import { Link, useNavigate } from "react-router";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { TPermissionItem } from "@/api/permission/type";

export const Component = () => {
  const navigate = useNavigate();
  const { filters, pagination, handleChange } = useFilter();

  const permissionsQuery = usePermissionsQuery(pagination);

  const deletePermissionMutation = useDeletePermissionMutation();

  const columns: ColumnsType<TPermissionItem> = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link to={`/iam/permissions/${record?.id}`}>
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                deletePermissionMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success("Permission berhasil dihapus");
                    navigate(0);
                  },
                });
              }}
            />
            <Link to={`/iam/permissions/${record?.id}/update`}>
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
      label: "Permissions",
      path: "/iam/permissions",
    },
  ];

  return (
    <Page title="Permissions" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
      <DataTable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={permissionsQuery.isLoading}
        source={makeSource(permissionsQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};

const TopAction = () => (
  <Link to="/iam/permissions/create">
    <Button icon={<PlusCircleOutlined />}>Add Permission</Button>
  </Link>
);
