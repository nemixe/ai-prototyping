import {
  DateRangePicker,
  TDateRangePicker,
} from "../../input/date-range-picker";

export type StrictDateRangePickerProps = Pick<
  TDateRangePicker,
  "value" | "onChange" | "defaultValue" | "disabledDate" | "format"
>;

const FilterDateRangePicker = (props: StrictDateRangePickerProps) => {
  return <DateRangePicker {...props} allowClear />;
};

export default FilterDateRangePicker;
