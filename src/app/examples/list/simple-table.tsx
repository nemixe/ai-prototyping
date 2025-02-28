import { ColumnsType } from "antd/es/table";
import Datatable from "admiral/table/datatable/index";
import dayjs from "dayjs";
import { Page } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";

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
  const { handleChange, pagination } = useFilter();
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
    <Page title="Users" breadcrumbs={breadcrumbs} noStyle>
      <Datatable
        hideSearch
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={false}
        source={makeSource(rolesData)}
        columns={columns}
      />
    </Page>
  );
};

export default Component;
