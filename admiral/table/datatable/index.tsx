import React, { useEffect, useRef, useState } from "react";
import { Table, Pagination, PaginationProps, Flex } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import {
  IDataTableProps,
  TOnSort,
  FilterState,
  FilterStateWithExtra,
  DataTablePagination,
} from "./type";
import ActionTable from "../action-table";
import { theme } from "../../util";
import { ColumnType } from "antd/lib/table";
import "./index.css";

const stylePagination: React.CSSProperties = {
  display: "flex",
  justifyContent: "end",
  padding: "16px 8px",
};
const tableLayout: React.CSSProperties = { width: "100%" };
const defaultSizeOption = [10, 20, 50, 100];

const ORDER_DICTIONARY: Record<string, "ASC" | "DESC" | undefined> = {
  ascend: "ASC",
  descend: "DESC",
};

const DataTable = <
  T extends Record<string, unknown>,
  X extends Record<string, unknown>,
>(
  props: IDataTableProps<T, X>,
) => {
  const {
    defaultCurrent,
    rowSelection,
    batchActionMenus,
    filterComponents,
    onChange,
    search,
    defaultSearch,
    showRowSelection = true,
    source,
    hideSearch,
    placeholderSearch,
    itemColor,
    bodyStyle,
    widthActionButton,
    typeActionButton,
    ...rest
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [state, setState] = useState<FilterState<T, X>>({});

  const stateRef = useRef<FilterState<T, X>>(state);
  const { token, admiral } = theme.useToken();

  useEffect(() => {
    // handle change sort
    if (!rest.columns) return;
    const sorter = stateRef.current.sorter || {};
    const sortedColumn = rest.columns.find(
      (column) => column.sortOrder && !("children" in column),
    ) as ColumnType<T>;
    if (sortedColumn) {
      sorter.field = sortedColumn.dataIndex?.toString();
      sorter.column = sortedColumn;
      sorter.order = sortedColumn.sortOrder
        ? ORDER_DICTIONARY[sortedColumn.sortOrder]
        : null;
      sorter.sort = sortedColumn.key?.toString();

      const newState: FilterState<T, X> = {
        ...stateRef.current,
        sorter,
      };
      handleSetState(newState);
    } else {
      const newState: FilterState<T, X> = {
        ...stateRef.current,
        sorter: undefined,
      };
      handleSetState(newState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest.columns]);

  useEffect(() => {
    // handle change pagination
    const pagination: DataTablePagination | undefined = !source?.meta
      ? undefined
      : {
          ...(stateRef.current.pagination || {}),
          page: source.meta.page || stateRef.current.pagination?.page,
          per_page:
            source.meta.pageSize || stateRef.current.pagination?.per_page,
          total: source.meta.total || stateRef.current.pagination?.total,
        };
    const newState: FilterState<T, X> = {
      ...stateRef.current,
      pagination,
    };
    handleSetState(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source?.meta]);

  useEffect(() => {
    // handle custom filter
    const customFilters = filterComponents?.reduce((a, c) => {
      if ("value" in c) return { ...a, [c.name]: c.value };
      return a;
    }, {});
    const newState: FilterState<T, Record<string, unknown>> = {
      ...stateRef.current,
      custom: { ...(stateRef.current.custom || {}), ...customFilters },
    };
    handleSetState(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterComponents]);

  useEffect(() => {
    // handle search
    const newState: FilterState<T, Record<string, unknown>> = {
      ...stateRef.current,
      custom: {
        ...(stateRef.current.custom || {}),
        search,
      },
    };
    handleSetState(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSetState = (value: FilterState<T, X>) => {
    setState(value);
    stateRef.current = value;
  };

  const handleOnChange = ({ extra, ...value }: FilterStateWithExtra<T, X>) => {
    handleSetState(value);
    onChange?.(
      value.custom,
      value.sorter,
      value.filters,
      value.pagination,
      extra,
    );
  };

  const handleSelectRow = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    const newState: FilterStateWithExtra<T, X> = {
      ...stateRef.current,
      pagination: {
        ...(stateRef.current.pagination || {}),
        page: page,
        per_page: pageSize,
      },
      extra: {
        action: "paginate",
        customContext: filterComponents,
      },
    };
    handleOnChange(newState);
  };

  const handleSearch = (value: string): void => {
    const newState: FilterStateWithExtra<T, Record<string, unknown>> = {
      ...stateRef.current,
      pagination: { ...(stateRef.current.pagination || {}), page: 1 }, // reset page to 1
      custom: {
        ...(stateRef.current.custom || {}),
        search: value,
      },
      extra: {
        action: "custom",
        customContext: filterComponents,
      },
    };

    handleOnChange(newState);
  };

  const handleFiltersChange = (
    customFilters: Record<string, unknown>,
  ): void => {
    const newState: FilterStateWithExtra<T, Record<string, unknown>> = {
      ...stateRef.current,
      pagination: { ...(stateRef.current.pagination || {}), page: 1 }, // reset page to 1
      custom: { ...(stateRef.current.custom || {}), ...customFilters },
      extra: {
        action: "custom",
        customContext: filterComponents,
      },
    };
    handleOnChange(newState);
  };

  const handleTableChange = (
    filters: Record<string, FilterValue | null>,
    sorter: TOnSort<T>,
    extra: TableCurrentDataSource<T>,
  ) => {
    const newState: FilterStateWithExtra<T, X> = {
      ...stateRef.current,
      filters: {
        ...(stateRef.current.filters || {}),
        ...filters,
      },
      sorter: sorter.order
        ? {
            ...(stateRef.current.sorter || {}),
            field: sorter.field,
            column: sorter.column,
            sort: String(sorter.columnKey),
            order: sorter.order,
          }
        : {},
      extra: {
        ...extra,
        customContext: filterComponents,
      },
    };
    handleOnChange(newState);
  };

  const headerBorderRadius =
    token.Table?.headerBorderRadius || token.borderRadius + 2;

  return (
    <Flex gap={16} vertical>
      <ActionTable
        searchValue={search}
        defaultSearchValue={defaultSearch}
        onSearch={handleSearch}
        hideSearch={hideSearch}
        selectedRows={rowSelection?.selectedRowKeys || selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        batchActionMenus={batchActionMenus}
        filters={filterComponents}
        onFiltersChange={handleFiltersChange}
        placeholderSearch={placeholderSearch}
        itemColor={itemColor}
        widthActionButton={widthActionButton}
        typeActionButton={typeActionButton}
      />
      <div
        style={{
          background: "white",
          borderRadius: `${headerBorderRadius}px ${headerBorderRadius}px`,
          ...(bodyStyle ? bodyStyle : {}),
        }}
      >
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <Table<T>
            rowSelection={
              showRowSelection
                ? {
                    onChange: handleSelectRow,
                    selectedRowKeys,
                    ...rowSelection,
                  }
                : undefined
            }
            {...rest}
            dataSource={source?.data}
            style={tableLayout}
            size="small"
            pagination={false}
            onChange={(
              _pagination,
              filters,
              sorter: SorterResult<T> | SorterResult<T>[],
              extra,
            ): void => {
              // WIP: temporary disabled multiple sorter
              if (Array.isArray(sorter)) return;
              const newSorter: TOnSort<T> = {
                ...sorter,
                order: sorter.order
                  ? ORDER_DICTIONARY[sorter.order]
                  : undefined,
              };

              handleTableChange(filters, newSorter, extra);
            }}
            rowKey={rest.rowKey || "id"}
          />
        </div>
        {stateRef.current.pagination && (
          <div
            style={{
              ...stylePagination,
              backgroundColor: token.colorBgContainer,
            }}
          >
            <Pagination
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              defaultCurrent={defaultCurrent || 1}
              showSizeChanger
              defaultPageSize={
                admiral?.DataTable.size?.[0] || defaultSizeOption[0]
              }
              pageSizeOptions={admiral?.DataTable.size || defaultSizeOption}
              {...stateRef.current.pagination}
              pageSize={
                source?.meta?.pageSize || stateRef.current.pagination.per_page
              }
              current={
                source?.meta?.page ||
                /** @deprecated
                 * source?.meta?.current will be deleted in future
                 * */
                source?.meta?.current ||
                stateRef.current.pagination.page
              }
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </Flex>
  );
};

export default DataTable;
