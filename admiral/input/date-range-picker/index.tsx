import dayjs from "dayjs";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";

const defaultPresets: RangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

export type TDateRangePicker = RangePickerProps;

export const DateRangePicker = (props: TDateRangePicker) => {
  return <DatePicker.RangePicker presets={defaultPresets} {...props} />;
};
