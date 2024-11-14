import { Breadcrumb, Button, Flex, Typography } from "antd";
import type { FC, ReactElement } from "react";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export type THeader = {
  breadcrumb?: BreadcrumbItemType[];
  title?: string;
  add?: {
    link?: string;
    text?: string;
  };
};

export const Header: FC<THeader> = (props): ReactElement => {
  const navigate = useNavigate();
  return (
    <Flex style={{ flexDirection: "column", gap: "20px" }}>
      <Flex gap={10}>
        {props?.breadcrumb?.length && props.breadcrumb.length > 2 && (
          <ArrowLeftOutlined onClick={() => navigate(-1)} size={42} />
        )}
        <Breadcrumb items={props.breadcrumb} />
      </Flex>
      <Flex
        style={{
          marginBottom: 24,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title style={{ fontSize: 28, margin: 0 }}>
          {props.title}
        </Typography.Title>
        {props.add && (
          <Link to={`${props?.add?.link}`}>
            <Button>{props.add?.text}</Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
