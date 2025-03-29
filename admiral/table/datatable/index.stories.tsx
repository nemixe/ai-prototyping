import type { Meta, StoryObj } from "@storybook/react";
import DataTableComponent from ".";
import { ItemType } from "./type";
import { FilterOutlined, ShareAltOutlined } from "@ant-design/icons";
import { TFilterGroupItem } from "../filter-collection/filter-group";
import { TFilterItem } from "../filter-collection/factory";
import { useTableFilter } from "..";
import { useState } from "react";
import { Input, Button, Divider, Typography, Form, DatePicker } from "antd";
import { Options } from "./hook";
import dayjs from "dayjs";

const useFilter = () => {
  const searchParams = new URLSearchParams(
    "user-order=ASC&user-page=1&user-per_page=10&user-filter%5Bcreated_at%5D=1729357200&user-filter%5Bupdate_at%5D=1729443600&user-no=312",
  );
  return useTableFilter({
    searchParams,
    cb: (params) => {
      console.log("Navigation Callback");
      console.log("Navigate with search params", params);
    },
    options: {
      prefix: "user",
    },
  });
};

const DataTable: typeof DataTableComponent = (props) => {
  const { filters, pagination, handleChange } = useFilter();
  console.log("filters", filters);
  console.log("pagination", pagination);
  return <DataTableComponent {...props} onChange={handleChange} />;
};

const meta = {
  title: "Design System/DataTable/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DataTable is a component for displaying a table with filters, batch actions, and other features.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    source: {
      description: "Data source for the table",
    },
    columns: {
      description: "Columns for the table",
    },
    filterComponents: {
      description: "Filter components for the table",
    },
    batchActionMenus: {
      description: "Batch action menus",
    },
    rowKey: {
      description: "Row key for the table",
    },
    onChange: {
      description: "Function to handle table change",
    },
  },
} satisfies Meta<typeof DataTableComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const batchActionMenus: ItemType[] = [
  {
    key: "1",
    label: "Update",
    icon: <ShareAltOutlined />,
    onClick: (keys, { reset }) => {
      console.log("Update", keys);
      reset();
    },
    style: { width: "151px" },
  },
];

const filterGroup: TFilterGroupItem[] = [
  {
    label: "Email",
    type: "Select",
    name: "email",
    placeholder: "Search email",
    options: [{ label: "Email 1", value: "email 1" }],
    span: 2,
  },
];

const filterComponents: TFilterItem[] = [
  {
    label: "Download",
    name: "download",
    render: () => <Button>Download</Button>,
  },
  {
    label: "Filter",
    type: "Group",
    name: "filter",
    filters: filterGroup,
    icon: <FilterOutlined />,
    cols: 2,
  },
  {
    label: "Checkbox",
    type: "CheckboxDropdown",
    name: "checkbox",
    placeholder: "Checkbox Dropdown",
    value: ["checkbox 1", "checkbox 2"],
    options: [
      { label: "Checkbox 1", value: "checkbox 1" },
      { label: "Checkbox 2", value: "checkbox 2" },
      { label: "Checkbox 3", value: "checkbox 3" },
      { label: "Checkbox 4", value: "checkbox 4" },
    ],
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Table: Story = {
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    source: {
      data: [
        { id: "1", name: "John Doe" },
        { id: "2", name: "John josh" },
      ],
      meta: {
        pageSize: 10,
        page: 1,
        total: 100,
      },
    },
    columns: [{ title: "Name", dataIndex: "name", key: "name" }],
    filterComponents,
    batchActionMenus,
    rowKey: "id",
    onChange: console.log,
  },
};

const DatatableWithHooks = () => {
  const [enableQueryParams, setEnableQueryParams] = useState(true);
  const [queryString, setQueryString] = useState("page=1&per_page=10");
  const [options, setOptions] = useState<Options>({});
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(queryString),
  );

  const applyQueryString = () => {
    console.log("Apply Query String", queryString);
    setSearchParams(new URLSearchParams(queryString));
  };

  const { filters, pagination, handleChange } = useTableFilter({
    searchParams: enableQueryParams ? searchParams : undefined,
    cb: (searchParams) => {
      console.log("CB", searchParams);
      if (!enableQueryParams) return;
      // To disable set query params, set a condition in project repo
      setQueryString(searchParams.toString());
      setSearchParams(new URLSearchParams(searchParams));
    },
    options,
  });

  const filterGroup: TFilterGroupItem[] = [
    {
      label: "Email",
      type: "Select",
      name: "email",
      placeholder: "Search email",
      options: [{ label: "Email 1", value: "email 1" }],
      defaultValue: filters.filter?.email,
      span: 2,
    },
    {
      label: "Created At",
      name: "created_at",
      render: DatePicker,
      value: filters.filter?.created_at
        ? dayjs.unix(filters.filter?.created_at)
        : undefined,
    },
  ];

  const filterComponents: TFilterItem[] = [
    {
      label: "Filter",
      type: "Group",
      name: "filter",
      filters: filterGroup,
      icon: <FilterOutlined />,
      cols: 2,
    },
    {
      label: "Checkbox",
      type: "CheckboxDropdown",
      name: "checkbox",
      placeholder: "Checkbox Dropdown",
      value: filters.checkbox,
      options: [
        { label: "Checkbox 1", value: "checkbox 1" },
        { label: "Checkbox 2", value: "checkbox 2" },
        { label: "Checkbox 3", value: "checkbox 3" },
        { label: "Checkbox 4", value: "checkbox 4" },
      ],
    },
  ];

  return (
    <>
      <Typography.Title level={4}>Options</Typography.Title>
      <div style={{ display: "flex", width: "100%", gap: "8px" }}>
        <Form.Item label="Prefix" style={{ flex: 1, marginBottom: 0 }}>
          <Input
            placeholder="prefix"
            value={options.prefix}
            onChange={(e) => setOptions({ ...options, prefix: e.target.value })}
            disabled={!enableQueryParams}
          />
        </Form.Item>
      </div>
      <Typography.Title level={4}>Query String</Typography.Title>
      <div style={{ display: "flex", width: "100%", gap: "8px" }}>
        <Input.TextArea
          placeholder="?page=1&per_page=10"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          style={{ flex: 1 }}
          disabled={!enableQueryParams}
        />
        <Button type="primary" onClick={() => applyQueryString()}>
          Apply
        </Button>

        <Button onClick={() => setEnableQueryParams(!enableQueryParams)}>
          Toggle query params
        </Button>
      </div>
      <Divider />
      <DataTableComponent
        source={{
          data: [
            { id: "1", name: "John Doe" },
            { id: "2", name: "John josh" },
          ],
          meta: {
            pageSize: pagination.per_page || 10,
            page: pagination.page || 1,
            total: 100,
          },
        }}
        columns={[
          { title: "Name", dataIndex: "name", key: "name", sorter: true },
        ]}
        filterComponents={filterComponents}
        rowKey="id"
        onChange={handleChange}
        search={filters.search}
      />
    </>
  );
};

export const UseTableFilter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrate how to use the `useTableFilter` hook to manage the filter and pagination state.",
      },
      source: {
        code: `
const [queryString, setQueryString] = useState("page=1&per_page=10");

const [searchParams, setSearchParams] = useState(
  new URLSearchParams(queryString),
);

const applyQueryString = () => {
  setSearchParams(new URLSearchParams(queryString));
};

const { filters, pagination, handleChange } = useTableFilter({
  searchParams: searchParams,
  cb: (searchParams) => {
    setQueryString(searchParams.toString());
    setSearchParams(new URLSearchParams(searchParams));
  },
  options: {
    prefix: "",
  },
});


return (
  <>
    <Typography.Title level={4}>Query String</Typography.Title>
    <div style={{ display: "flex", width: "100%", gap: "8px" }}>
      <Input
        placeholder="?page=1&per_page=10"
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
        style={{ flex: 1 }}
      />
      <Button type="primary" onClick={() => applyQueryString()}>
        Apply
      </Button>
    </div>
    <Divider />
    <DataTableComponent
      source={{
        data: [
          { id: "1", name: "John Doe" },
          { id: "2", name: "John josh" },
        ],
        meta: {
          pageSize: pagination.per_page || 10,
          current: pagination.page || 1,
          total: 100,
        },
      }}
      columns={[{ title: "Name", dataIndex: "name", key: "name" }]}
      filterComponents={filterComponents}
      rowKey="id"
      onChange={handleChange}
      search={filters.search}
    />
  </>
);
  ` as string,
      },
    },
  },
  render: () => <DatatableWithHooks />,
};
