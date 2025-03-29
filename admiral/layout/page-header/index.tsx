import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import React from "react";
import Breadcrumbs, { TBreadcrumbsItem } from "../../breadcrumb";
import { theme } from "../../util";

export interface IPageHeaderProps {
  title?: React.ReactNode;
  topActions?: React.ReactNode;
  breadcrumbs?: TBreadcrumbsItem[];
  goBack?: () => void;
}

export const PageHeader: React.FC<IPageHeaderProps> = (
  props: IPageHeaderProps,
) => {
  const { admiral } = theme.useToken();
  return (
    <>
      {(!!props.breadcrumbs || !!props.title || !!props.topActions) && (
        <div style={{ marginBottom: "20px" }}>
          {props.breadcrumbs && props.breadcrumbs?.length > 0 && (
            <Row>
              <Breadcrumbs
                breadcrumbs={props.breadcrumbs}
                NavigationAs={admiral.Page?.NavigationAs}
              />
            </Row>
          )}
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Col flex="auto">
              <div style={{ display: "flex", alignItems: "center" }}>
                {props.goBack && (
                  <ArrowLeftOutlined
                    onClick={props.goBack}
                    style={{
                      fontSize: "16px",
                      marginRight: "16px",
                      cursor: "pointer",
                    }}
                  />
                )}
                {props.title && (
                  <Typography.Title
                    style={{
                      fontSize: "24px",
                      lineHeight: "32px",
                      margin: "0px",
                    }}
                  >
                    {props.title}
                  </Typography.Title>
                )}
              </div>
            </Col>
            <Col>
              {props.topActions && <Space wrap>{props.topActions}</Space>}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
