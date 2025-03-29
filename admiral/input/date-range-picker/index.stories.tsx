import { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./index";
import dayjs from "dayjs";

const meta: Meta<typeof DateRangePicker> = {
  title: "Design System/Input/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DateRangePicker is a component for selecting a date range with predefined presets.",
      },
    },
  },
  argTypes: {
    allowClear: {
      description: "Whether to show clear button",
      control: { type: "boolean" },
    },
    autoFocus: {
      description: "Get focus when component mounted",
      control: { type: "boolean" },
    },
    className: {
      description: "Custom class name",
      control: { type: "text" },
    },
    disabled: {
      description: "Disabled state of picker",
      control: { type: "boolean" },
    },
    presets: {
      description: "Preset ranges for quick selection",
      control: { type: "object" },
    },
  },
};

export default meta;

export const DateRangePickerMolecule: StoryObj<typeof DateRangePicker> = {
  args: {},
};

export const DateRangePickerNoPresets: StoryObj<typeof DateRangePicker> = {
  args: {
    presets: [],
  },
};

export const DateRangePickerWithClassName: StoryObj<typeof DateRangePicker> = {
  args: {
    className: "custom-class-name",
  },
};

export const DateRangePickerDisabled: StoryObj<typeof DateRangePicker> = {
  args: {
    disabled: true,
  },
};

// TODO: Saat ini belum bisa pass options untuk formatting react-element-to-jsx-string. Menunggu version yg lebih baru.
export const DateRangePickerFullExample: StoryObj<typeof DateRangePicker> = {
  args: {
    allowClear: true,
    autoFocus: false,
    className: "custom-class-name",
    disabled: false,
    presets: [
      { label: "Last 3 Days", value: [dayjs().add(-3, "d"), dayjs()] },
      { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    ],
    defaultValue: [dayjs().add(-7, "d"), dayjs()],
    disabledDate: (current) => current && current > dayjs().endOf("day"),
    format: "YYYY-MM-DD",
    placeholder: ["Start Date", "End Date"],
    onChange: (dates, dateStrings) => {
      console.log("Selected Dates:", dates);
      console.log("Formatted Date Strings:", dateStrings);
    },
    onOpenChange: (open) => {
      console.log("Dropdown open state:", open);
    },
    onPanelChange: (dates, mode) => {
      console.log("Panel change:", dates, mode);
    },
    ranges: {
      Today: [dayjs(), dayjs()],
      "This Month": [dayjs().startOf("month"), dayjs().endOf("month")],
    },
    showTime: true,
    showToday: true,
    suffixIcon: <span>📅</span>,
    inputReadOnly: true,
  },
  render: ({ children, ...args }) => (
    <DateRangePicker {...args}>{children}</DateRangePicker>
  ),
};
