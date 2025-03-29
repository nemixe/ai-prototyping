import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxOptionType,
  Dropdown,
  Space,
  theme,
} from "antd";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const { useToken } = theme;

export interface IPropsCheckboxDropdown {
  defaultValue?: CheckboxValueType[];
  placeholder?: React.ReactNode;
  options?: CheckboxOptionType[];
  value?: CheckboxValueType[];
  onChange?: (checkedValue: CheckboxValueType[]) => void;
  allowClear?: boolean;
}

interface IPropsCheckboxDropdownRender {
  options?: CheckboxOptionType[];
  value?: CheckboxValueType[];
  defaultValue?: CheckboxValueType[];
  onChange?: (checkedValue: CheckboxValueType[]) => void;
}

const CheckboxDropdownRender: React.FC<IPropsCheckboxDropdownRender> = (
  props,
) => {
  const { options, value, defaultValue, onChange } = props;
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: 4,
    maxHeight: 256,
    overflow: "auto",
  };

  return (
    <div style={contentStyle}>
      <Checkbox.Group
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        <Space direction="vertical">
          {options?.map((option, index) => (
            <Checkbox key={index} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </div>
  );
};

export const CheckboxDropdown: React.FC<IPropsCheckboxDropdown> = (props) => {
  const { placeholder, options, value, onChange, defaultValue, allowClear } =
    props;

  const handleOnClear = () => {
    onChange?.([]);
  };

  const { token } = useToken();
  const [open, setOpen] = useState(false);

  const labelStyle: React.CSSProperties = {
    color: value?.length ? token.colorText : token.colorTextPlaceholder,
    display: "flex",
    justifyContent: "space-between",
  };

  const iconClearStyle: React.CSSProperties = {
    color: token.colorTextPlaceholder,
    cursor: "pointer",
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      dropdownRender={() => (
        <CheckboxDropdownRender
          options={options}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
      )}
    >
      <Button>
        <Space style={labelStyle}>
          {placeholder}
          {allowClear && value?.length ? (
            <CloseCircleFilled onClick={handleOnClear} style={iconClearStyle} />
          ) : (
            <DownOutlined />
          )}
        </Space>
      </Button>
    </Dropdown>
  );
};
