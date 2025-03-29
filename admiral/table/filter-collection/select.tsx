import { Select, SelectProps } from "antd";

export type StrictSelectProps = Omit<SelectProps, "render">;

const FilterSelect = (props: StrictSelectProps) => {
  return <Select allowClear {...props} />;
};

export default FilterSelect;
