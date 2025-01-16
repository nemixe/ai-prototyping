"use client";
import { Suspense, type FC, type ReactElement } from "react";
import { lazily } from "react-lazily";
import { Layout } from "antd";
import { SIDEBAR_ITEMS, TSidebarItem } from "@/commons/constants/sidebar";
import { UserCookies } from "@/libs/cookies";
import { checkPermission } from "@/utils/permission";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

const { Flex, Menu } = lazily(() => import("antd"));

export const Sidebar: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions =
    userData?.role?.permissions?.map((perm) => perm.name) || [];

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

  const { Sider } = Layout;
  return (
    <Suspense fallback="Load sidebar..">
      <Sider width={220}>
        <Flex
          style={{
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ fontSize: "16px" }}>Vite Admiral</h1>
        </Flex>
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                backgroundColor: "white",
                borderRight: 0,
                padding: "49px",
              }}
            >
              Loading...
            </div>
          }
        >
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={filteredItems}
          />
        </Suspense>
      </Sider>
    </Suspense>
  );
};
