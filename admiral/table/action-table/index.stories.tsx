import { Meta, StoryObj } from "@storybook/react";
import ActionTableComponent from ".";
import { Input } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { ItemType } from "../datatable/type";
import { TFilterItem } from "../filter-collection/factory";

const meta: Meta<typeof ActionTableComponent> = {
  title: "Design System/DataTable/ActionTable",
  component: ActionTableComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ActionTable is a component for displaying a table with batch actions and filters.",
      },
    },
  },
  argTypes: {
    batchActionMenus: {
      description: "Batch action menus",
    },
    filters: {
      description: "Filters",
    },
    selectedRows: {
      description: "Selected rows",
    },
    onSearch: {
      description: "On search event",
    },
    onFiltersChange: {
      description: "On filters change event",
    },
  },
};

export default meta;

const batchActionMenus: ItemType[] = [
  {
    key: "1",
    label: "Delete",
    onClick: console.log,
    icon: <ShareAltOutlined />,
    style: { width: "151px" },
  },
];

const filters: TFilterItem[] = [
  {
    label: "Checkbox",
    type: "CheckboxDropdown",
    name: "checkbox",
    placeholder: "Checkbox Dropdown",
    options: [{ label: "Checkbox 1", value: "checkbox 1" }],
  },
  {
    label: "Email",
    // TODO: Ini membuat tampilan pada source-code jadi tidak terbaca. Pertimbangkan untuk membuat menggunakan `function` untuk custom render.
    render: Input,
    name: "email",
    placeholder: "Search email",
  },
  {
    label: "Created At",
    type: "DateRangePicker",
    name: "created_at",
  },
];

export const ActionTable: StoryObj<typeof ActionTableComponent> = {
  args: {
    batchActionMenus,
    filters,
    selectedRows: [1],
    onSearch: console.log,
    onFiltersChange: console.log,
  },
};
