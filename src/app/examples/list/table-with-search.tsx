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

import { TRoleGetRequest, TRoleItem, TRoleListResponse } from "../type";

const getRoles = (params: TRoleGetRequest): TRoleListResponse => {
  console.log(params);
  return {
    status_code: 200,
    data: {
      items: [
        {
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
          name: "Admin",
          key: "admin",
          id: "9b89100c-fd49-4b87-b2fd-763832c59cc1",
          created_at: "2023-10-01T00:00:00.000Z",
          updated_at: "2023-10-01T00:00:00.000Z",
          deleted_at: null,
        },
        {
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
          id: "410b4d3f-9ea1-4871-81ff-b091cf6c15fb",
          created_at: "2023-10-01T00:00:00.000Z",
          updated_at: "2023-10-01T00:00:00.000Z",
          deleted_at: null,
        },
      ],
      meta: {
        total_page: 1,
        total: 2,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};

export const Component = () => {
  const navigate = useNavigate();
  const { handleChange, pagination, filters } = useFilter();

  const rolesData = getRoles(pagination);

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
                message.success("Role berhasil dihapus");
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
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={false}
        source={makeSource(rolesData)}
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
