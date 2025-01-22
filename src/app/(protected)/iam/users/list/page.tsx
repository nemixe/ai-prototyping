"use client";

import { ActionTable, Page } from "admiral";
import { Button, Flex, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Datatable from "admiral/table/datatable/index";
import { ColumnsType } from "antd/es/table";
import { useDeleteUserMutation } from "./_hooks/use-delete-user-mutation";
import { useUsersQuery } from "./_hooks/use-users-query";
import { makeSource } from "@/utils/data-table";
import { Link, useNavigate } from "react-router";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { TUserItem } from "@/api/user/type";
import { ROUTES } from "@/commons/constants/routes";
import { urlParser } from "@/utils/url-parser";

const Component = () => {
  const navigate = useNavigate();
  const { filters, setFilters, pagination, handleChange } = useFilter();

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
      <ActionTable
        onSearch={(value) => setFilters({ search: value })}
        searchValue={filters.search}
        onFiltersChange={(values) => setFilters(values as Record<string, string>)}
        filters={[
          {
            label: "filter",
            name: "filter",
            type: "Group",
            icon: <FilterOutlined />,
            filters: [
              {
                label: "Name",
                name: "name",
                type: "Select",
                placeholder: "Filter Name",
                value: filters.name,
                options: [
                  {
                    label: "A-Z",
                    value: "ASC",
                  },
                  {
                    label: "Z-A",
                    value: "DESC",
                  },
                ],
              },
              {
                label: "Email",
                name: "email",
                type: "Select",
                placeholder: "Filter Email",
                value: filters.email,
                options: [
                  {
                    label: "A-Z",
                    value: "ASC",
                  },
                  {
                    label: "Z-A",
                    value: "DESC",
                  },
                ],
              },
              {
                label: "Role",
                name: "role",
                type: "Select",
                placeholder: "Filter Role",
                value: filters.role,
                options: [
                  {
                    label: "Admin",
                    value: "admin",
                  },
                  {
                    label: "Staff",
                    value: "staff",
                  },
                ],
              },
            ],
          },
        ]}
      />
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          marginTop: "10px",
        }}
      >
        <Datatable
          onChange={handleChange}
          rowKey="id"
          showRowSelection={false}
          loading={usersQuery.isLoading}
          source={makeSource(usersQuery.data)}
          columns={columns}
          search={filters.search}
        />
      </div>
    </Page>
  );
};

const TopAction = () => (
  <Link to={ROUTES.iam.users.create}>
    <Button icon={<PlusCircleOutlined />}>Add User</Button>
  </Link>
);

export default Component;
