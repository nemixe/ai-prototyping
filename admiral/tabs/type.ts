import type { TabsProps } from "antd";
import type { TabsType } from "antd/es/tabs";

export type TTabs = Omit<TabsProps, "type"> & {
  type?: TabsType | "bordered-card";
};
