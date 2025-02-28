import { Button, Flex, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { ActionTable, Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import { makeSource } from "@/utils/data-table";
import dayjs from "dayjs";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { Link, useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";
import { useDeleteRole, useGetRoles } from "./hook";
import { TRoleItem } from "./type";

export const Component = () => {
  const navigate = useNavigate();
  const { handleChange, pagination, filters, setFilters } = useFilter();
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
                deleteRoleMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success("Role berhasil dihapus");
                    navigate(0);
                  },
                });
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
          loading={rolesQuery.isLoading}
          source={makeSource(rolesQuery.data)}
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

export default Component;
