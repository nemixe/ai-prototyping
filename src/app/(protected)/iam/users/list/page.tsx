"use client";

import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Datatable from "admiral/table/datatable/index";
import { ColumnsType } from "antd/es/table";
import { useDeleteUserMutation } from "./_hooks/use-delete-user-mutation";
import { useUsersQuery } from "./_hooks/use-users-query";
import { makeSource } from "@/utils/data-table";
import { Link, useNavigate } from "react-router-dom";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { TUserItem } from "@/api/user/type";
import { ROUTES } from "@/commons/constants/routes";
import { urlParser } from "@/utils/url-parser";

export const Component = () => {
  const navigate = useNavigate();
  const { filters, pagination, handleChange } = useFilter();

  const usersQuery = useUsersQuery(pagination);

  const deleteUserMutation = useDeleteUserMutation();

  const columns: ColumnsType<TUserItem> = [
    {
      dataIndex: "fullname",
      key: "fullname",
      title: "Name",
    },
    {
      dataIndex: "email",
      title: "Email",
      key: "email",
    },
    {
      dataIndex: "role",
      title: "Role",
      key: "role",
      render: (_, record) => {
        return record.roles.map((role) => role.name).join(", ");
      },
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      key: "createdAt",
      render: (_, record) => {
        return new Date(record.created_at).toLocaleString();
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
              to={urlParser(ROUTES.iam.users.detail, {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                deleteUserMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success("User berhasil dihapus");
                    navigate(0);
                  },
                });
              }}
            />
            <Link
              to={urlParser(ROUTES.iam.users.update, {
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
      label: "Users",
      path: ROUTES.iam.users.list,
    },
  ];

  return (
    <Page title="Users" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={usersQuery.isLoading}
        source={makeSource(usersQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};

const TopAction = () => (
  <Link to={ROUTES.iam.users.create}>
    <Button icon={<PlusCircleOutlined />}>Add User</Button>
  </Link>
);
