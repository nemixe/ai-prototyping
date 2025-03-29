import React from "react";
import { Dropdown, Card, Button, Flex } from "antd";
import { DeleteOutlined, FilterOutlined } from "@ant-design/icons";
import DropdownFormContainer from "../../form/dropdown-form-container";

export type TDropdownFilterProps = {
  children: React.ReactNode;
};

// TODO: need to handle action clear and apply
/**
 * @deprecated
 * please use filter type 'Group' instead in datatable or filter table or action table
 */

const DropdownFilter: React.FC<TDropdownFilterProps> = ({ children }) => {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "content",
            label: (
              <Card>
                <DropdownFormContainer
                  layout="vertical"
                  style={{ maxWidth: "480px" }}
                >
                  {children}
                </DropdownFormContainer>
                <Flex wrap="wrap" gap={"small"} justify="flex-end">
                  <Button icon={<DeleteOutlined />}>Clear</Button>
                  <Button type="primary" icon={<FilterOutlined />}>
                    Apply
                  </Button>
                </Flex>
              </Card>
            ),
          },
        ],
      }}
      placement="bottom"
      arrow
    >
      <Button icon={<FilterOutlined />}>Filter</Button>
    </Dropdown>
  );
};

export default DropdownFilter;
