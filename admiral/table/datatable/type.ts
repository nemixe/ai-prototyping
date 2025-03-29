import type { TableProps } from "antd/es/table";
import {
  ColumnType,
  FilterValue,
  SorterResult,
  TableAction,
} from "antd/es/table/interface";

import React from "react";
import { MenuItemType, SubMenuType } from "antd/es/menu/hooks/useItems";
import { TFilterItem } from "../filter-collection/factory";
import { PaginationProps } from "antd/lib/pagination";

export type TOrder = {
  order: "ASC" | "DESC" | undefined;
};

export type TOnSort<T> = Omit<SorterResult<T>, "order"> & TOrder;

/* Custom types component Dropdown ant design for supporting passing selectedRowKeys from component DataTable */
export declare type MenuClickEventHandler = (
  selectedRowKeys: React.Key[],
  cb: {
    reset: (keys?: React.Key[]) => void;
  },
) => void;

export type MenuInfo = {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export interface IMenuItemType extends Omit<MenuItemType, "onClick"> {
  onClick?: MenuClickEventHandler;
}
export interface ISubMenuType extends Omit<SubMenuType, "onClick"> {
  onClick?: MenuClickEventHandler;
}
export type ItemType = IMenuItemType;

export type DataTableSorter<T extends Record<string, unknown>> = {
  column?: ColumnType<T>;
  order?: "DESC" | "ASC" | null;
  field?: React.Key | readonly React.Key[];
  sort?: string;
};

export type DataTablePagination = {
  total?: number;
  page?: number;
  per_page?: number;
};

export type CustomFilter<X extends Record<string, unknown>> =
  | (X & {
      search?: string;
    })
  | { search?: string };

export interface ITableCurrentDataSource<RecordType> {
  action: TableAction | "custom";
  currentDataSource?: RecordType[];
  customContext?: unknown[];
}

export type FilterState<
  T extends Record<string, unknown>,
  X extends Record<string, unknown>,
> = {
  custom?: CustomFilter<X>;
  sorter?: DataTableSorter<T>;
  filters?: Record<string, FilterValue | null>;
  pagination?: DataTablePagination;
};
export type FilterStateWithExtra<
  T extends Record<string, unknown>,
  X extends Record<string, unknown>,
> = FilterState<T, X> & {
  extra: ITableCurrentDataSource<T>;
};

export interface IDataTableProps<
  T extends Record<string, unknown>,
  X extends Record<string, unknown>,
> extends Omit<TableProps<T>, "onChange" | "dataSource" | "pagination"> {
  defaultCurrent?: number;
  batchActionMenus?: ItemType[];
  filterComponents?: TFilterItem[];
  placeholderSearch?: string;
  search?: string;
  defaultSearch?: string;
  source?: {
    data?: TableProps<T>["dataSource"];
    meta?: Omit<PaginationProps, "current"> & {
      /**
       * @deprecated
       * please use page instead
       */
      current?: number;
      page?: number; // override `current` from antd
    };
  };
  onChange?: (
    customFilter?: CustomFilter<X>,
    sorter?: DataTableSorter<T>,
    filters?: Record<string, FilterValue | null>,
    pagination?: DataTablePagination,
    extra?: ITableCurrentDataSource<T>,
  ) => void;
  hideSearch?: boolean;
  showRowSelection?: boolean;
  itemColor?: string;
  bodyStyle?: React.CSSProperties;
  typeActionButton?: "primary" | "default" | "dashed" | "link" | "text";
  widthActionButton?: string;
}
