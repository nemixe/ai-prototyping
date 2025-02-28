import dayjs from "dayjs";
import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";
import { Link, useNavigate } from "react-router";

import { urlParser } from "@/utils/url-parser";

const data = {
  id: "1",
  fullname: "John Doe",
  email: "john@doe.com",
  birthdate: "1990-01-01",
  created_at: "2021-01-01",
  updated_at: "2021-01-01",
};

export const Component = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Users",
      path: "/users",
    },
    {
      label: data.fullname ?? "",
      path: "#",
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              message.success("User successfully deleted");
              navigate("/users");
            }}
          >
            Delete
          </Button>
          <Link
            to={urlParser("/users/update/:id", {
              id: data.id ?? "",
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title="User Details"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <Section loading={false} title="User Details">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Full Name" key="fullname">
            {data.fullname}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email" key="email">
            {data.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Birth Date" key="birthdate">
            {data.birthdate ? dayjs(data.birthdate).format("DD/MM/YYYY") : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Created At" key="created_at">
            {data.created_at ? dayjs(data.created_at).format("DD/MM/YYYY") : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At" key="updated_at">
            {data.updated_at ? dayjs(data.updated_at).format("DD/MM/YYYY") : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
