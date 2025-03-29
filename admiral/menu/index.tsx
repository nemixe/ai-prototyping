import { Flex, Popover } from "antd";
import React from "react";
import "./menu.css";

type MenuProps = React.ComponentPropsWithoutRef<"div">;

const Menu = ({ ...props }: MenuProps) => <div role="menu" {...props} />;

Menu.displayName = "Menu";

const MenuDropdown = React.forwardRef<
  React.ElementRef<typeof Popover>,
  React.ComponentPropsWithoutRef<typeof Popover> & {
    label: React.ReactNode;
    title: React.ReactNode;
    moreText?: React.ReactNode;
    children: React.ReactNode;
  }
>(
  (
    {
      label,
      trigger = "click",
      children,
      placement = "bottomRight",
      arrow = false,
      title,
      moreText,
      overlayStyle,
      ...props
    },
    ref,
  ) => (
    <Popover
      className="custom"
      ref={ref}
      trigger={trigger}
      content={children}
      arrow={arrow}
      placement={placement}
      overlayStyle={{
        maxWidth: "377px",
        width: "100%",
        ...overlayStyle,
      }}
      title={
        <Flex justify="space-between">
          <div style={{ color: "#000000A6", fontWeight: 600 }}>{title}</div>

          {moreText && moreText}
        </Flex>
      }
      {...props}
    >
      {label}
    </Popover>
  ),
);

MenuDropdown.displayName = "MenuDropdown";

Menu.Dropdown = MenuDropdown;

export default Menu;
