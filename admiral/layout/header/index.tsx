import { MenuOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { themeColors } from "../../util/theme";
import CompanyLogo from "../../icon/company-logo";
import UserAvatar from "../../avatar/user-avatar";
export type TMainHeaderProps = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  info?: {
    fullname: string;
    roles: { name: string }[];
  };
  children?: React.ReactNode;
};

const MainHeader: React.FC<TMainHeaderProps> = ({
  info,
  setCollapsed,
  collapsed,
}) => {
  return (
    <Header
      style={{
        backgroundColor: themeColors.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "24px",
      }}
    >
      <Flex gap={12} style={{ alignItems: "center" }}>
        <Button type="text" onClick={() => setCollapsed(!collapsed)}>
          <MenuOutlined style={{ color: "white" }} />
        </Button>

        <CompanyLogo src="https://static-00.iconduck.com/assets.00/ant-design-icon-2048x2046-dl3neb73.png" />
      </Flex>

      <Flex gap={24} align="center">
        <UserAvatar info={info} />
      </Flex>
    </Header>
  );
};

export default MainHeader;
