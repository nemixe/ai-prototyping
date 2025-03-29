import { Meta, StoryObj } from "@storybook/react";
import FilterTableComponent, { TFilterTableProps } from "./index";
import { Input } from "antd";
import FilterTable from "./index";

const meta: Meta<TFilterTableProps> = {
  title: "Design System/DataTable/FilterTable",
  component: FilterTableComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "FilterTable is a component for displaying a table with filters.",
      },
    },
  },
  argTypes: {
    filters: {
      description: "List of filters",
      control: {
        type: "TFilterItem[]",
      },
    },
    onFiltersChange: {
      description: "Function to handle filter changes",
      action: "filter change",
      control: {
        type: `(
          values: Record<string, unknown>,
          filters: TFilterItem[],
        ) => void`,
      },
    },
    onSearch: {
      description: "Function to handle search",
      action: "search",
    },
    defaultSearchValue: {
      description: "Default search value",
      control: {
        type: "text",
      },
    },
    placeholderSearch: {
      description: "Search input placeholder",
      control: {
        type: "text",
      },
    },
    hideSearch: {
      description: "Hide search input",
      control: {
        type: "boolean",
      },
    },
  },
};

export default meta;

type Story = StoryObj<TFilterTableProps>;

export const AllVariants: Story = {
  render: () => (
    <FilterTable
      filters={[
        {
          label: "Group Filter",
          type: "Group",
          name: "group_filter",
          filters: [
            {
              label: "Status",
              type: "Select",
              name: "status",
              placeholder: "Select Status",
              options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ],
            },
            {
              label: "Created At",
              type: "DateRangePicker",
              name: "created_at",
            },
          ],
        },
        {
          label: "Categories",
          type: "CheckboxDropdown",
          name: "categories",
          placeholder: "Select Categories",
          options: [
            { label: "Category 1", value: "cat1" },
            { label: "Category 2", value: "cat2" },
            { label: "Category 3", value: "cat3" },
          ],
        },
      ]}
      onSearch={console.log}
      onFiltersChange={console.log}
    />
  ),
};

export const WithoutSearch: Story = {
  args: {
    hideSearch: true,
    filters: [
      {
        label: "Status",
        type: "Select",
        name: "status",
        placeholder: "Select Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
    ],
  },
};

export const FilterSelect: Story = {
  args: {
    filters: [
      {
        label: "Status",
        type: "Select",
        name: "status",
        placeholder: "Select Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
    ],
    onSearch: console.log,
    onFiltersChange: console.log,
  },
};

export const FilterDateRangePicker: Story = {
  args: {
    filters: [
      {
        label: "Created At",
        type: "DateRangePicker",
        name: "created_at",
      },
    ],
    onSearch: console.log,
    onFiltersChange: console.log,
  },
};

export const FilterCheckboxDropdown: Story = {
  args: {
    filters: [
      {
        label: "Categories",
        type: "CheckboxDropdown",
        name: "categories",
        placeholder: "Select Categories",
        options: [
          { label: "Category 1", value: "cat1" },
          { label: "Category 2", value: "cat2" },
          { label: "Category 3", value: "cat3" },
        ],
      },
    ],
    onSearch: console.log,
    onFiltersChange: console.log,
  },
};

export const FilterGroupPanel: Story = {
  args: {
    filters: [
      {
        label: "Price Range",
        type: "Group",
        name: "price_range",
        filters: [
          {
            label: "Status",
            type: "Select",
            name: "status",
            placeholder: "Select Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
          {
            label: "Created At",
            type: "DateRangePicker",
            name: "created_at",
          },
        ],
      },
    ],
    onSearch: console.log,
    onFiltersChange: console.log,
  },
};

export const FilterCustom: Story = {
  render: () => (
    <FilterTable
      filters={[
        {
          label: "Search",
          render: Input,
          name: "search",
          placeholder: "Search...",
        },
      ]}
      onSearch={console.log}
      onFiltersChange={console.log}
    />
  ),
};
