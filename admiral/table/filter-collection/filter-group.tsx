import React, { useEffect, useState } from "react";
import { Button, Col, Flex, Form, Popover, Row, Typography } from "antd";
import InputCollection from "./index";
import { StrictDateRangePickerProps } from "./date-range-picker";
import { StrictCheckboxDropdown } from "./checkbox-dropdown";
import { StrictSelectProps } from "./select";
import { merge } from "../../util/merge";

type RegisterFilterGroupItem<
  P extends Record<string, unknown>,
  T extends string | undefined,
> =
  | (P & {
      label: React.ReactNode;
      type?: T;
      name: string;
      span?: number;
    })
  | {
      label: React.ReactNode;
      type?: T;
      name: string;
      span?: number;
    };

type CustomFilterProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: React.FC<any>;
};

export type TFilterGroupItem =
  | RegisterFilterGroupItem<StrictSelectProps, "Select">
  | RegisterFilterGroupItem<StrictDateRangePickerProps, "DateRangePicker">
  | RegisterFilterGroupItem<StrictCheckboxDropdown, "CheckboxDropdown">
  | RegisterFilterGroupItem<CustomFilterProps, undefined>;

export type TFilterItemProps = {
  type: TFilterGroupItem;
  isMobile: boolean;
};

export type StrictFilterGroup = Pick<
  IFilterGroupProps,
  | "value"
  | "onChange"
  | "defaultValue"
  | "filters"
  | "cols"
  | "maxWidth"
  | "icon"
  | "title"
  | "children"
  | "autoClose"
>;

export interface IFilterGroupProps {
  filters?: TFilterGroupItem[];
  children?: React.ReactNode;
  onChange?: (store: Record<string, unknown>) => void;
  value?: Record<string, unknown>;
  autoClose?: boolean;
  filterValue?: Record<string, unknown>;
  defaultValue?: Record<string, unknown>;
  cols?: number;
  maxWidth?: React.CSSProperties["maxWidth"];
  icon?: React.ReactNode;
  title?: string;
}

const FilterGroup = (props: IFilterGroupProps) => {
  const [open, setOpen] = useState(false);
  const [submittedValue, setSubmittedValue] =
    useState<Record<string, unknown>>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!props.value) {
      const initialValues: Record<string, unknown> = props.defaultValue || {};
      if (props.filters) {
        props.filters.forEach((filter) => {
          if ("defaultValue" in filter)
            initialValues[filter.name] = filter.defaultValue;
        });
      }
      form.setFieldsValue(initialValues);
      setSubmittedValue(initialValues);
    }
  }, []);

  useEffect(() => {
    if (props.filters) {
      const initialValues: Record<string, unknown> = {};
      props.filters.forEach((filter) => {
        if ("value" in filter) initialValues[filter.name] = filter.value;
      });
      const value = props.filterValue
        ? merge(props.filterValue, initialValues)
        : initialValues;

      setSubmittedValue((old) => ({ ...old, ...value }));
      form.setFieldsValue(value);
    }
  }, [props.filters, props.filterValue]);

  const handleSubmit = (formData: Record<string, unknown>) => {
    props.onChange?.(formData);
    setSubmittedValue(formData);
    props.autoClose && setOpen(false);
  };

  const handleReset = () => {
    const data = form.getFieldsValue();
    props.filters?.forEach((filter) => {
      data[filter.name] = submittedValue?.[filter.name] || undefined;
    });
    form.setFieldsValue(data);
  };

  const handleClear = () => {
    const dataForInternal = form.getFieldsValue();
    const dataForExternal = form.getFieldsValue();

    props.filters?.forEach((filter) => {
      if (
        !("value" in filter) &&
        !(props.filterValue && filter.name in props.filterValue)
      )
        dataForInternal[filter.name] = undefined;
    });
    form.setFieldsValue(dataForInternal);
    setSubmittedValue((old) => ({ ...old, ...dataForInternal }));

    props.filters?.forEach((filter) => {
      dataForExternal[filter.name] = undefined;
    });
    props.onChange?.(dataForExternal);
    props.autoClose && setOpen(false);
  };

  const handleOnOpenChange = (visible: boolean) => {
    setOpen(visible);
    if (!visible) return;
    handleReset();
  };

  return (
    <Popover
      trigger="click"
      arrow={false}
      placement="bottomLeft"
      onOpenChange={handleOnOpenChange}
      open={open}
      content={
        <Form
          form={form}
          onFinish={handleSubmit}
          style={{
            width: "calc(100vw - 72px)",
            maxWidth: props.maxWidth || "700px",
            padding: "12px",
          }}
        >
          {props.children ? (
            props.children
          ) : (
            <Flex vertical gap={24}>
              <Row gutter={[8, 16]}>
                {props.filters?.map((filter) => (
                  <Col
                    key={filter.name}
                    span={(24 / (props.cols || 1)) * (filter.span || 1)}
                  >
                    <FilterItem isMobile={true} type={filter} />
                  </Col>
                ))}
              </Row>
              <Flex justify="end" gap={14}>
                <Button htmlType="button" onClick={() => handleClear()}>
                  Clear
                </Button>
                <Button type="primary" htmlType="submit">
                  Apply
                </Button>
              </Flex>
            </Flex>
          )}
        </Form>
      }
    >
      <Button icon={props.icon}>{props.title || "Filter"}</Button>
    </Popover>
  );
};

const FilterInputNotFound = () => <div></div>;

const FilterItem = (props: TFilterItemProps) => {
  const { name, type, label, ...rest } = props.type;

  const customFilterProps = props.type as CustomFilterProps;

  const Component =
    (type && InputCollection[type]) ||
    customFilterProps.render ||
    FilterInputNotFound;

  return (
    <Flex gap={8} vertical={props.isMobile}>
      {props.isMobile && <Typography.Text>{label}</Typography.Text>}
      <Form.Item name={name} noStyle>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Component {...(rest as any)} />
      </Form.Item>
    </Flex>
  );
};

export default FilterGroup;
