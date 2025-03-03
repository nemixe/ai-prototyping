import dayjs from "dayjs";
import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";
import { Link, useNavigate } from "react-router";

import { urlParser } from "@/utils/url-parser";

const user = {
  data: {
    id: "1",
    fullname: "John Doe",
    email: "john@doe.com",
    birthdate: "1990-01-01",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
  },
  loading: false,
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
      label: user.data.fullname ?? "",
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
              id: user.data.id ?? "",
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
      <Section loading={user.loading} title="User Details">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Full Name" key="fullname">
            {user.data.fullname}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email" key="email">
            {user.data.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Birth Date" key="birthdate">
            {user.data.birthdate ? dayjs(user.data.birthdate).format("DD/MM/YYYY") : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Created At" key="created_at">
            {user.data.created_at ? dayjs(user.data.created_at).format("DD/MM/YYYY") : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At" key="updated_at">
            {user.data.updated_at ? dayjs(user.data.updated_at).format("DD/MM/YYYY") : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
