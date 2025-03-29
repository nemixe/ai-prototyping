import React, { useState } from "react";
import { Button, Card, Select, Space, Typography, Dropdown, Flex } from "antd";
import {
  DeleteOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";

type TColumnOption = {
  value: string;
  label: string;
};

export type TSortFilterProps = {
  columnOptions: TColumnOption[];
};

// TODO: need to handle action clear and apply
/**
 * @deprecated
 * please use filter type 'Group' instead in datatable or filter table or action table
 */
const DropdownSort: React.FC<TSortFilterProps> = ({ columnOptions }) => {
  const [selectedColumn, setSelectedColumn] = useState<string>(
    columnOptions[0]?.value,
  );
  const [selectedOrder, setSelectedOrder] = useState<string>("ASC");

  const handleColumnChange = (value: string) => {
    setSelectedColumn(value);
  };

  const handleOrderChange = (value: string) => {
    setSelectedOrder(value);
  };

  return (
    <Dropdown
      dropdownRender={(): React.ReactElement => (
        <Card>
          <Typography.Title level={5}>Column</Typography.Title>
          <Space wrap style={{ padding: "20px" }}>
            <Select
              value={selectedColumn}
              onChange={handleColumnChange}
              style={{ width: 200 }}
              options={columnOptions}
            />
            <Select
              value={selectedOrder}
              onChange={handleOrderChange}
              style={{ width: 300 }}
              options={[
                // TODO: need to handle dynamic order
                { value: "ASC", label: "Ascending" },
                { value: "DESC", label: "Descending" },
              ]}
            />
          </Space>
          <Flex wrap="wrap" gap={"small"} justify="flex-end">
            <Button icon={<DeleteOutlined />}>Clear</Button>
            <Button type="primary" icon={<FilterOutlined />}>
              Apply
            </Button>
          </Flex>
        </Card>
      )}
      placement="bottom"
      arrow
    >
      <Button icon={<SortAscendingOutlined />}>Sort</Button>
    </Dropdown>
  );
};

export default DropdownSort;
