import { useState } from "react";
import { Button, Flex, message } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import Datatable from "admiral/table/datatable/index";
import dayjs from "dayjs";
import { Link } from "react-router";
import { ActionTable, Page, Tabs } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { Space } from "antd";

// Dummy data for books
const allRoles = {
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
          inactive_at: null,
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
          inactive_at: null,
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

const inactiveRoles = {
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
          inactive_at: "2023-10-01T00:00:00.000Z",
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
          inactive_at: "2023-10-01T00:00:00.000Z",
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
  const { handleChange, filters } = useFilter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const allRoleColumns = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
      sorter: true,
    },
    {
      dataIndex: "permissions",
      title: "Permissions",
      key: "permissions",
      sorter: true,
      render: (_, record) => {
        return record.permissions?.map((role) => role.name).join(", ");
      },
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      sorter: true,
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
              to={urlParser("/roles/:id", {
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
              }}
            />
            <Link
              to={urlParser("/roles/:id/update", {
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

  const inActiveRoleColumns = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
      sorter: true,
    },
    {
      dataIndex: "permissions",
      title: "Permissions",
      key: "permissions",
      sorter: true,
      render: (_, record) => {
        return record.permissions?.map((role) => role.name).join(", ");
      },
    },
    {
      dataIndex: "inActiveDate",
      title: "InActive Date",
      sorter: true,
      key: "inActiveDate",
      render: (_, record) => {
        return record.inactive_at ? dayjs(record.inactive_at).format("DD/MM/YYYY") : "-";
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
              to={urlParser("/roles/:id", {
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
              }}
            />
            <Link
              to={urlParser("/roles/:id/update", {
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
      <Space direction="vertical" style={{ width: "100%" }}>
        <ActionTable
          filters={[
            {
              label: "filter",
              name: "filter",
              type: "Group",
              icon: <FilterOutlined />,
              cols: 2,
              filters: [
                {
                  label: "Name",
                  name: "name",
                  type: "Select",
                  placeholder: "Type to search",
                  defaultValue: filters.name,
                  options: [
                    {
                      label: "Admin",
                      value: "admin",
                    },
                    {
                      label: "Super Admin",
                      value: "super-admin",
                    },
                  ],
                },
                {
                  label: "Period",
                  name: "date",
                  type: "DateRangePicker",
                  defaultValue: filters.date,
                },
                {
                  label: "Permissions",
                  name: "permissions",
                  type: "CheckboxDropdown",
                  defaultValue: filters.permissions,
                  placeholder: "Type to search",
                  options: [
                    {
                      label: "View Role",
                      value: "view-role",
                    },
                    {
                      label: "Create Role",
                      value: "create-role",
                    },
                    {
                      label: "Update Role",
                      value: "update-role",
                    },
                  ],
                },
                {
                  label: "",
                  name: "statuses",
                  defaultValue: filters?.group?.statuses,
                  span: 2,
                  render: ({ value = [], onChange }) => {
                    const statuses = [
                      {
                        label: "Active",
                        value: "active",
                      },
                      {
                        label: "Inactive",
                        value: "inactive",
                      },
                      {
                        label: "Pending",
                        value: "pending",
                      },
                    ];
                    return (
                      <Checkbox.Group
                        name="statuses"
                        style={{ width: "100%" }}
                        defaultValue={value}
                        onChange={(checkedValues) => {
                          onChange(checkedValues);
                        }}
                      >
                        <Row gutter={[10, 10]}>
                          {statuses.map((item) => (
                            <Col key={item.value} xs={24} sm={12} md={12}>
                              <Checkbox value={item.value}>{item.label}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    );
                  },
                },
              ],
            },
            {
              label: "Sort",
              title: "Sort",
              name: "sort",
              type: "Group",
              icon: <SortAscendingOutlined />,
              cols: 2,
              filters: [
                {
                  label: "Field",
                  name: "sort_by",
                  type: "Select",
                  placeholder: "Choose field",
                  value: filters?.sort_by,
                  options: [
                    {
                      label: "Name",
                      value: "name",
                    },
                    {
                      label: "Permission",
                      value: "permission",
                    },
                  ],
                },
                {
                  label: <span style={{ color: "white" }}>.</span>,
                  name: "order",
                  type: "Select",
                  placeholder: "Order",
                  value: filters?.order,
                  options: [
                    {
                      label: "Ascending",
                      value: "asc",
                    },
                    {
                      label: "Descending",
                      value: "desc",
                    },
                  ],
                },
              ],
            },
          ]}
          selectedRows={selectedRowKeys}
          batchActionMenus={[
            {
              key: "delete",
              label: "Delete",
              onClick: (_values, cb) => {
                message.success("Selected roles successfully deleted");
                cb.reset();
                setSelectedRowKeys([]);
              },
              danger: true,
              icon: <DeleteOutlined />,
            },
            {
              key: "download",
              label: "Download",
              onClick: (_values, cb) => {
                message.success("Selected roles successfully downloaded");
                cb.reset();
                setSelectedRowKeys([]);
              },
              icon: <DownloadOutlined />,
            },
          ]}
        />
        <Tabs
          type="bordered-card"
          items={[
            {
              label: "All Roles",
              key: "all",
              children: (
                <Datatable
                  onChange={handleChange}
                  rowKey="id"
                  loading={allRoles.loading}
                  source={makeSource(allRoles.data)}
                  columns={allRoleColumns}
                  search={filters.search}
                  hideSearch
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRows) => setSelectedRowKeys(selectedRows),
                  }}
                />
              ),
            },
            {
              label: "Inactive Roles",
              key: "inactive",
              children: (
                <Datatable
                  onChange={handleChange}
                  rowKey="id"
                  loading={inactiveRoles.loading}
                  source={makeSource(inactiveRoles.data)}
                  columns={inActiveRoleColumns}
                  search={inactiveRoles.search}
                  hideSearch
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRows) => setSelectedRowKeys(selectedRows),
                  }}
                />
              ),
            },
          ]}
        />
      </Space>
    </Page>
  );
};

const TopAction = () => (
  <Link to={"/roles/create"}>
    <Button icon={<PlusCircleOutlined />}>Add Role</Button>
  </Link>
);

export default Component;
