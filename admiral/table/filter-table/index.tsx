import { Input, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import InputFactory, { TFilterItem } from "../filter-collection/factory";
import { theme } from "../../util";
import { useEffect, useRef, useState } from "react";

export type TFilterTableProps = {
  filters?: TFilterItem[];
  placeholderSearch?: string;
  onFiltersChange?: (
    values: Record<string, unknown>,
    filters: TFilterItem[],
  ) => void;
  onSearch?: (value: string) => void;
  searchValue?: string;
  defaultSearchValue?: string;
  hideSearch?: boolean;
};

const FilterTable = (props: TFilterTableProps) => {
  const { admiral } = theme.useToken();
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [search, setSearch] = useState(props.searchValue);

  useEffect(() => {
    setSearch(props.searchValue);
  }, [props.searchValue]);

  const handleOnSearch = (value: string) => {
    setSearch(value);
    setTimeoutRef.current && clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = setTimeout(() => {
      props.onSearch?.(value || "");
    }, 550);
  };

  return (
    <Flex gap={8} flex={1} wrap="wrap">
      {/* Filters */}
      {props.filters?.length ? (
        <Flex flex={0}>
          <InputFactory
            onChange={props?.onFiltersChange}
            filters={props.filters}
          />
        </Flex>
      ) : null}
      {/* Search */}
      {!props.hideSearch && (
        <Flex flex={1}>
          <Input
            prefix={<SearchOutlined />}
            placeholder={
              props.placeholderSearch ||
              admiral.DataTable.placeholderSearch ||
              "Search"
            }
            onChange={(e) => {
              handleOnSearch(e.target.value);
            }}
            value={search}
            defaultValue={props.defaultSearchValue}
            allowClear
          />
        </Flex>
      )}
    </Flex>
  );
};

export default FilterTable;
