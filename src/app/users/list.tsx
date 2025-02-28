import { Button, Flex, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router";
import dayjs from "dayjs";
import { ActionTable, Page } from "admiral";
import Datatable from "admiral/table/datatable/index";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";

import { TUserGetRequest, TUserItem, TUserListResponse } from "./type";

const getUsers = (params: TUserGetRequest): TUserListResponse => {
  console.log(params);
  const dummyUsers = Array.from({ length: 10 }, (_, index) => ({
    id: "9b89100c-fd49-4b87-b2fd-763832c59cc1",
    fullname: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    birthdate: "1990-01-01",
    password: "password123",
    created_at: "2024-02-21T00:00:00Z",
    updated_at: null,
    deleted_at: null,
  }));

  return {
    status_code: 200,
    data: {
      items: dummyUsers,
      meta: {
        total_page: 1,
        total: 2,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0",
  };
};

export const Component = () => {
  const navigate = useNavigate();
  const { handleChange, pagination, filters, setFilters } = useFilter();
  const usersData = getUsers(pagination);

  const columns: ColumnsType<TUserItem> = [
    {
      dataIndex: "fullname",
      key: "fullname",
      title: "Full Name",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "birthdate",
      key: "birthdate",
      title: "Birth Date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      dataIndex: "created_at",
      title: "Created At",
      key: "created_at",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
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
                message.success("User successfully deleted");
                navigate(0);
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
          loading={false}
          source={makeSource(usersData)}
          columns={columns}
          search={filters.search}
        />
      </div>
    </Page>
  );
};

const TopAction = () => (
  <Link to="/users/create">
    <Button icon={<PlusCircleOutlined />}>Add User</Button>
  </Link>
);

export default Component;
