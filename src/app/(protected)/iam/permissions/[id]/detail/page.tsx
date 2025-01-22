"use client";

import { Page, Section } from "admiral";
import { Descriptions } from "antd";

import { usePermissionQuery } from "../_hooks/use-permission-query";
import { useParams } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { urlParser } from "@/utils/url-parser";

const Component = () => {
  const params = useParams();
  const permissionId = typeof params.id === "string" ? params.id : "";
  const permissionQuery = usePermissionQuery(permissionId);

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
    },
    {
      label: "Permission",
      path: ROUTES.iam.permissions.list,
    },
    {
      label: permissionQuery.data?.data.name ?? "",
      path: urlParser(ROUTES.iam.permissions.detail, { id: permissionId }),
    },
  ];

  return (
    <Page title="Detail Permission" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={permissionQuery.isLoading} title="Detail Permission">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {permissionQuery.data?.data.name}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
