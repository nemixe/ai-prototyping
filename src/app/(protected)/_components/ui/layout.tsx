"use client";
import type { FC, ReactElement } from "react";
import { LayoutWithHeader } from "admiral";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import { SIDEBAR_ITEMS, TSidebarItem } from "@/commons/constants/sidebar";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { checkPermission } from "@/utils/permission";
import { Flex, Grid, Typography } from "antd";

export const ProtectedLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions =
    userData?.role?.permissions?.map((perm) => perm.name) || [];

  const { md } = Grid.useBreakpoint();

  const filterSidebarItems = (
    items: TSidebarItem[],
  ): ItemType<MenuItemType>[] | undefined =>
    items
      ?.filter((item) =>
        item.permissions?.length
          ? checkPermission({ permissions: item.permissions, userPermissions })
          : true,
      )
      .map((item) => ({
        ...item,
        children: item.children ? filterSidebarItems(item.children) : undefined,
      }));

  const filteredItems = filterSidebarItems(SIDEBAR_ITEMS);

  return (
    <LayoutWithHeader
      header={{
        brandLogo: (
          <Flex align="center" gap={8}>
            <Typography.Title
              level={4}
              style={{
                marginBottom: 0,
                color: md ? "white" : "black",
                whiteSpace: "nowrap",
              }}
            >
              Vite Admiral
            </Typography.Title>
          </Flex>
        ),
      }}
      sidebar={{
        width: 250,
        menu: filteredItems,
        theme: "light",
      }}
    >
      <Outlet />
    </LayoutWithHeader>
  );
};
