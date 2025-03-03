import { Button, Flex, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { ActionTable, Page, DataTable } from "admiral";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";

const roles = {
  data: {
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
  },
  loading: false,
};

export const Component = () => {
  const navigate = useNavigate();
  const { handleChange, filters, setFilters } = useFilter();

  const columns = [
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
              to={urlParser("/roles/detail/:id", {
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
              to={urlParser("/roles/update/:id", {
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
      label: "Roles",
      path: "/roles",
    },
  ];

  return (
    <Page title="Roles" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
      <ActionTable
        onSearch={(value) => setFilters({ search: value })}
        searchValue={filters.search}
        onFiltersChange={(values) => setFilters(values)}
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
        <DataTable
          onChange={handleChange}
          rowKey="id"
          showRowSelection={false}
          loading={roles.loading}
          source={makeSource(roles.data)}
          columns={columns}
          search={filters.search}
        />
      </div>
    </Page>
  );
};

const TopAction = () => (
  <Link to={"/roles/create"}>
    <Button icon={<PlusCircleOutlined />}>Add Role</Button>
  </Link>
);
