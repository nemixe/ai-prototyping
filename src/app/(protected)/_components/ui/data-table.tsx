"use client";
import { Table } from "antd";
import type { ReactElement } from "react";
import type { TableProps } from "antd/es/table";

export type TDataTable<T> = TableProps<T> & {
  data: TableProps<T>["dataSource"];
};

export const DataTable = <T extends Record<string, unknown>>(
  props: TDataTable<T>
): ReactElement => {
  return (
    <Table<T>
      {...props}
      style={{ border: "1px solid #F5F5F5", borderRadius: "10px" }}
      dataSource={props?.data}
    />
  );
};
