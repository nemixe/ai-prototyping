import {
  CheckboxDropdown,
  IPropsCheckboxDropdown,
} from "../../input/checkbox-dropdown";

export type StrictCheckboxDropdown = Pick<
  IPropsCheckboxDropdown,
  "value" | "onChange" | "options" | "placeholder" | "defaultValue"
>;

const FilterCheckboxDropdown = (props: StrictCheckboxDropdown) => {
  const { value, onChange, options, placeholder, defaultValue } = props;

  return (
    <CheckboxDropdown
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      defaultValue={defaultValue}
      allowClear
    />
  );
};

export default FilterCheckboxDropdown;
