import { ColumnsType } from "antd/es/table";
import Datatable from "admiral/table/datatable/index";
import dayjs from "dayjs";
import { Page } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";

import { useGetRoles } from "../hook";
import { TRoleItem } from "../type";

export const Component = () => {
  const { handleChange, pagination } = useFilter();
  const rolesQuery = useGetRoles(pagination);

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
        loading={rolesQuery.isLoading}
        source={makeSource(rolesQuery.data)}
        columns={columns}
      />
    </Page>
  );
};

export default Component;
