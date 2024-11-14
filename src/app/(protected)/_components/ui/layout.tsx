"use client";
import type { FC, ReactElement } from "react";
import { Layout } from "antd";
import { Sidebar } from "./sidebar";
import { Outlet } from "react-router-dom";

export const ProtectedLayout: FC = (): ReactElement => {
  const { Content } = Layout;
  return (
    <Layout
      style={{
        minHeight: "100vh",
        height: "100%",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Sidebar />
      <Layout style={{ padding: 24, alignItems: "center", width: "100%" }}>
        <Content
          style={{
            padding: "24px",
            margin: 0,
            minHeight: 280,
            height: "auto",
            borderRadius: 20,
            backgroundColor: "white",
            maxWidth: 1440,
            width: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
