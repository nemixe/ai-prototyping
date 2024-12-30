"use client";
import { Suspense, type FC, type ReactElement } from "react";
import { lazily } from "react-lazily";
import { Layout } from "antd";
import { SIDEBAR_ITEMS } from "@/commons/constants/sidebar";

const { Flex, Menu } = lazily(() => import("antd"));

export const Sidebar: FC = (): ReactElement => {
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
            items={SIDEBAR_ITEMS}
          />
        </Suspense>
      </Sider>
    </Suspense>
  );
};
