import React from "react";
import { Space, Tooltip, Button, Dropdown, Card } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { iconActionTableStyle } from "../../util/theme";
import { useIsMobileScreen } from "../../util/screen";

type ButtonType = "view" | "edit" | "delete" | "custom";

export interface IRowActionButtonsProps {
  type?: ButtonType;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

export interface IRowActionProps {
  actions: IRowActionButtonsProps[];
}

const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
  const isMobile = useIsMobileScreen();

  const renderButton = (action: IRowActionButtonsProps) => {
    const { type, href, onClick, title, disabled } = action;
    let { icon } = action;

    if (!icon) {
      switch (type) {
        case "view":
          icon = <EyeOutlined style={iconActionTableStyle} />;
          break;
        case "edit":
          icon = <EditOutlined style={iconActionTableStyle} />;
          break;
        case "delete":
          icon = <DeleteOutlined style={iconActionTableStyle} />;
          break;
        default:
          break;
      }
    }

    return (
      <Tooltip title={title} key={title}>
        {href ? (
          <Link href={href}>
            <Button
              type="text"
              shape="circle"
              onClick={onClick}
              icon={icon}
              disabled={disabled}
              style={{ margin: "-8px 0", padding: "0px" }}
            />
          </Link>
        ) : (
          <Button
            type="text"
            shape="circle"
            onClick={onClick}
            icon={icon}
            disabled={disabled}
            style={{ margin: "-8px 0", padding: "0px" }}
          />
        )}
      </Tooltip>
    );
  };

  return isMobile ? (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Card size="small">
          <Space wrap>
            {actions.slice(0, 3).map((action) => renderButton(action))}
          </Space>
        </Card>
      }
      placement="bottomLeft"
    >
      <Button
        type="text"
        icon={<MoreOutlined />}
        style={{ margin: "-8px 0", padding: "0px" }}
      />
    </Dropdown>
  ) : (
    <Space direction="vertical">
      <Space wrap>{actions.map((action) => renderButton(action))}</Space>
    </Space>
  );
};

export default RowActionButtons;
