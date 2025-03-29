import React from "react";
import { Typography, Space, Dropdown, Divider, Flex, Button } from "antd";
import FilterTable from "../filter-table";
import { TFilterItem } from "../filter-collection/factory";
import { ItemType } from "../datatable/type";
import { DownOutlined } from "@ant-design/icons";

export type TActionTableProps = {
  filters?: TFilterItem[];
  placeholderSearch?: string;
  onFiltersChange?: (
    values: Record<string, unknown>,
    filters: TFilterItem[],
  ) => void;
  selectedRows?: React.Key[];
  batchActionMenus?: ItemType[];
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<React.Key[]>>;
  onSearch?: (value: string) => void;
  searchValue?: string;
  defaultSearchValue?: string;
  hideSearch?: boolean;
  itemColor?: string;
  typeActionButton?: "primary" | "default" | "dashed" | "link" | "text";
  widthActionButton?: string;
};

const ActionTable = ({
  selectedRows,
  batchActionMenus,
  setSelectedRowKeys,
  itemColor = "#006D75", // Default color
  widthActionButton,
  typeActionButton,
  ...rest
}: TActionTableProps) => {
  const handleReset = (keys: React.Key[] = []) => {
    setSelectedRowKeys?.(keys);
  };
  return (
    <>
      {((selectedRows &&
        selectedRows.length > 0 &&
        batchActionMenus &&
        batchActionMenus.length > 0) ||
        (rest.filters && rest.filters?.length > 0) ||
        !rest.hideSearch) && (
        <Flex gap={8} align="center" wrap="wrap">
          {selectedRows &&
            selectedRows.length > 0 &&
            batchActionMenus?.length === 1 && (
              <Button
                type="primary"
                icon={batchActionMenus[0]?.icon}
                onClick={() =>
                  batchActionMenus[0]?.onClick?.(selectedRows, {
                    reset: handleReset,
                  })
                }
                disabled={batchActionMenus[0]?.disabled}
                className={batchActionMenus[0]?.className}
              >
                {batchActionMenus[0]?.label}
              </Button>
            )}
          {selectedRows &&
            selectedRows.length > 0 &&
            batchActionMenus &&
            batchActionMenus?.length > 1 && (
              <>
                <Space>
                  <Dropdown
                    menu={{
                      items:
                        batchActionMenus?.map((menu) => ({
                          ...menu,
                          onClick: () =>
                            menu?.onClick?.(selectedRows, {
                              reset: handleReset,
                            }),
                        })) || [],
                    }}
                    placement="bottomLeft"
                    trigger={["click"]}
                  >
                    <Button
                      type={typeActionButton}
                      style={{ width: widthActionButton }}
                    >
                      <Space>
                        Action
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                  <Typography.Text style={{ color: itemColor }}>
                    {selectedRows.length} item selected
                  </Typography.Text>
                </Space>
                <Divider type="vertical" style={{ padding: "14px 0px" }} />
              </>
            )}
          <Flex flex={1}>
            <FilterTable {...rest} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ActionTable;
