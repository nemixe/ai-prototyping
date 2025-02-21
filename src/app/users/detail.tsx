import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router";
import { urlParser } from "@/utils/url-parser";
import { useDeleteUser, useGetDetailUser } from "./hook";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = typeof params.id === "string" ? params.id : "";
  const userQuery = useGetDetailUser(userId);
  const deleteUserMutation = useDeleteUser();

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
      label: userQuery.data?.data.fullname ?? "",
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
              deleteUserMutation.mutate(userQuery.data?.data.id ?? "", {
                onSuccess: () => {
                  message.success("User successfully deleted");
                  navigate("/users");
                },
              });
            }}
          >
            Delete
          </Button>
          <Link
            to={urlParser("/users/update/:id", {
              id: userQuery.data?.data.id ?? "",
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
      <Section loading={userQuery.isLoading} title="User Details">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Full Name" key="fullname">
            {userQuery.data?.data.fullname}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email" key="email">
            {userQuery.data?.data.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Birth Date" key="birthdate">
            {userQuery.data?.data.birthdate
              ? dayjs(userQuery.data?.data.birthdate).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Created At" key="created_at">
            {userQuery.data?.data.created_at
              ? dayjs(userQuery.data?.data.created_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Updated At" key="updated_at">
            {userQuery.data?.data.updated_at
              ? dayjs(userQuery.data?.data.updated_at).format("DD/MM/YYYY")
              : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
