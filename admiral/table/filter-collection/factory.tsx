import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Flex, Form, Grid, Row, Typography } from "antd";
import InputCollection from "./index";
import { StrictDateRangePickerProps } from "./date-range-picker";
import { FilterOutlined } from "@ant-design/icons";
import { StrictCheckboxDropdown } from "./checkbox-dropdown";
import { StrictSelectProps } from "./select";
import { IFilterGroupProps, StrictFilterGroup } from "./filter-group";
import { debounce } from "../../util";

type BaseRegisterFilterItem<P extends Record<string, unknown>> = P & {
  label: React.ReactNode;
  name: string;
  width?: React.CSSProperties["width"] | number;
};

type RegisterFilterItemWithType<
  P extends Record<string, unknown>,
  T extends string,
> = BaseRegisterFilterItem<P> & {
  type: T;
};

type RegisterFilterItemWithoutType<P extends Record<string, unknown>> =
  BaseRegisterFilterItem<P> & {
    type?: never;
  };

type RegisterFilterItem<
  P extends Record<string, unknown>,
  T extends string | undefined = undefined,
> = T extends undefined
  ? RegisterFilterItemWithoutType<P>
  : RegisterFilterItemWithType<P, Exclude<T, undefined>>;

type CustomFilterProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: React.FC<any>;
  value?: unknown;
};

export type TFilterItem =
  | RegisterFilterItem<StrictSelectProps, "Select">
  | RegisterFilterItem<StrictDateRangePickerProps, "DateRangePicker">
  | RegisterFilterItem<StrictCheckboxDropdown, "CheckboxDropdown">
  | RegisterFilterItem<StrictFilterGroup, "Group">
  | RegisterFilterItem<CustomFilterProps, undefined>;

export type TFilterItemProps = {
  type: TFilterItem;
  isMobile: boolean;
};

export interface IInputFactoryProps {
  filters?: TFilterItem[];
  onChange?: (store: Record<string, unknown>, context: TFilterItem[]) => void;
}

const InputFactory = ({ filters, onChange }: IInputFactoryProps) => {
  const [form] = Form.useForm();
  const { md } = Grid.useBreakpoint();
  const [open, setOpen] = useState(false);
  const [localStore, setLocalStore] = useState<Record<string, unknown>>({});

  const storeKeys = Object.keys(localStore);
  const isFilterUsed =
    storeKeys.length &&
    storeKeys.some(
      (key) =>
        localStore[key] !== null &&
        localStore[key] !== undefined &&
        localStore[key] !== "",
    );
  //@typescript-eslint/no-unused-vars
  const handleStoreChangeDeb = debounce((_, store: Record<string, unknown>) => {
    onChange?.(store, filters || []);
    setLocalStore(store);
  }, 550);

  useEffect(() => {
    if (md) setOpen(false);
  }, [md]);

  useEffect(() => {
    if (filters) {
      const initialValues: Record<string, unknown> = {};
      filters.forEach((filter) => {
        if (!("value" in filter) && "defaultValue" in filter)
          initialValues[filter.name] = filter.defaultValue;
      });
      form.setFieldsValue(initialValues);
    }
  }, [filters, form]);

  useEffect(() => {
    if (filters) {
      const initialValues: Record<string, unknown> = {};
      filters.forEach((filter) => {
        if ("value" in filter) initialValues[filter.name] = filter.value;
      });
      form.setFieldsValue(initialValues);
    }
  }, [filters, form]);

  return (
    <Form form={form} onValuesChange={handleStoreChangeDeb}>
      <Row>
        <Col xs={0} md={24}>
          <Flex gap={8}>
            {filters?.map((filter) => (
              <FilterItem key={filter.name} isMobile={false} type={filter} />
            ))}
          </Flex>
        </Col>
        <Col xs={24} md={0}>
          <Button
            type={isFilterUsed ? "primary" : undefined}
            onClick={() => setOpen(true)}
            icon={<FilterOutlined style={{ display: "inline-flex" }} />}
          />
          <Drawer
            title="Filters"
            placement="right"
            closable
            onClose={() => setOpen(false)}
            open={open}
          >
            <Flex gap={8} vertical>
              {filters?.map((filter) => (
                <FilterItem key={filter.name} isMobile={true} type={filter} />
              ))}
            </Flex>
          </Drawer>
        </Col>
      </Row>
    </Form>
  );
};

const FilterInputNotFound = () => <div></div>;

const FilterItem = (props: TFilterItemProps) => {
  const { name, type, label, width, ...rest } = props.type;

  if (type === "Group" && "value" in rest) {
    (rest as IFilterGroupProps).filterValue = rest.value;
  }

  const customFilterProps = props.type as CustomFilterProps;

  const Component =
    (type && InputCollection[type]) ||
    customFilterProps.render ||
    FilterInputNotFound;

  return (
    <Flex vertical={props.isMobile}>
      {props.isMobile ? (
        <>
          <Typography.Text>{label}</Typography.Text>

          <Form.Item name={name} noStyle>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Component {...(rest as any)} />
          </Form.Item>
        </>
      ) : (
        <Flex style={{ width }} vertical>
          <Form.Item name={name} noStyle>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Component {...(rest as any)} />
          </Form.Item>
        </Flex>
      )}
    </Flex>
  );
};

export default InputFactory;
