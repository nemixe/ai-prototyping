"use client";

import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useUserQuery } from "../_hooks/use-user-query";
import { useParams } from "react-router";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const params = useParams();
  const userId = typeof params.id === "string" ? params.id : "";
  const userQuery = useUserQuery(userId);

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
    },
    {
      label: "User",
      path: ROUTES.iam.users.list,
    },
    {
      label: userQuery.data?.data.name ?? "",
      path: `/iam/users/${userQuery.data?.data.id}`,
    },
  ];

  return (
    <Page title="Detail User" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={userQuery.isLoading} title="Detail User">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {userQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email">
            {userQuery.data?.data.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Role">
            {userQuery.data?.data.roles.map((role) => role.name).join(", ")}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
