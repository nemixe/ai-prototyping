import { DataTable, Page, Section } from "admiral";
import {
  Button,
  Descriptions,
  Flex,
  message,
  Typography,
  Steps,
  Modal,
  ConfigProvider,
  Space,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { CheckCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";

// Sample user data
const user = {
  data: {
    status_code: 200,
    data: {
      id: "1",
      username: "johndoe",
      fullName: "John Doe",
      role: "Admin",
      permissionCount: 15,
      address: "123 Main St, New York, USA",
      email: "john.doe@example.com",
      status: "Approved",
      gender: "Male",
      created_at: "2023-01-15T00:00:00.000Z",
      updated_at: "2023-06-20T00:00:00.000Z",
    },
    version: "1.0.0",
  },
  loading: false,
};

// Sample permissions data
const permissions = {
  data: {
    status_code: 200,
    data: {
      items: [
        {
          id: "1",
          menu: "Dashboard",
          permissionType: "Read",
          totalUsers: 45,
        },
        {
          id: "2",
          menu: "Users",
          permissionType: "Read",
          totalUsers: 20,
        },
        {
          id: "3",
          menu: "Users",
          permissionType: "Create",
          totalUsers: 15,
        },
        {
          id: "4",
          menu: "Users",
          permissionType: "Update",
          totalUsers: 15,
        },
        {
          id: "5",
          menu: "Users",
          permissionType: "Delete",
          totalUsers: 10,
        },
        {
          id: "6",
          menu: "Roles",
          permissionType: "Read",
          totalUsers: 20,
        },
        {
          id: "7",
          menu: "Roles",
          permissionType: "Create",
          totalUsers: 15,
        },
        {
          id: "8",
          menu: "Roles",
          permissionType: "Update",
          totalUsers: 15,
        },
        {
          id: "9",
          menu: "Roles",
          permissionType: "Delete",
          totalUsers: 10,
        },
        {
          id: "10",
          menu: "Settings",
          permissionType: "Read",
          totalUsers: 5,
        },
      ],
      meta: {
        total_page: 1,
        total: 10,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  },
  loading: false,
};

// Sample login activity data
const loginActivities = [
  {
    id: "1",
    loginTime: "2023-12-01T09:00:00.000Z",
    logoutTime: "2023-12-01T17:30:00.000Z",
    device: "Chrome / Windows 10",
    totalOnlineTime: "8h 30m",
  },
  {
    id: "2",
    loginTime: "2023-12-02T08:45:00.000Z",
    logoutTime: "2023-12-02T16:15:00.000Z",
    device: "Chrome / Windows 10",
    totalOnlineTime: "7h 30m",
  },
  {
    id: "3",
    loginTime: "2023-12-03T09:15:00.000Z",
    logoutTime: "2023-12-03T18:00:00.000Z",
    device: "Safari / macOS",
    totalOnlineTime: "8h 45m",
  },
  {
    id: "4",
    loginTime: "2023-12-04T08:30:00.000Z",
    logoutTime: "2023-12-04T17:45:00.000Z",
    device: "Chrome / Windows 10",
    totalOnlineTime: "9h 15m",
  },
  {
    id: "5",
    loginTime: "2023-12-05T09:30:00.000Z",
    logoutTime: "2023-12-05T16:30:00.000Z",
    device: "Firefox / Ubuntu",
    totalOnlineTime: "7h 00m",
  },
];

const Component = () => {
  const navigate = useNavigate();
  const { handleChange } = useFilter();

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
      label: user.data.data.username,
      path: "#",
    },
  ];

  const getStatusTag = (status) => {
    switch (status) {
      case "Approved":
        return <Tag color="green">{status}</Tag>;
      case "Revised":
        return <Tag color="orange">{status}</Tag>;
      case "Rejected":
        return <Tag color="red">{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const items = [
    {
      key: "username",
      label: "Username",
      children: <Typography.Text strong>{user.data.data.username ?? "-"}</Typography.Text>,
    },
    {
      key: "fullName",
      label: "Full Name",
      children: <Typography.Text strong>{user.data.data.fullName ?? "-"}</Typography.Text>,
    },
    {
      key: "email",
      label: "Email",
      children: <Typography.Text strong>{user.data.data.email ?? "-"}</Typography.Text>,
    },
    {
      key: "role",
      label: "Role",
      children: <Typography.Text strong>{user.data.data.role ?? "-"}</Typography.Text>,
    },
    {
      key: "permissionCount",
      label: "Permission Count",
      children: <Typography.Text strong>{user.data.data.permissionCount ?? "-"}</Typography.Text>,
    },
    {
      key: "gender",
      label: "Gender",
      children: <Typography.Text strong>{user.data.data.gender ?? "-"}</Typography.Text>,
    },
    {
      key: "address",
      label: "Address",
      children: <Typography.Text strong>{user.data.data.address ?? "-"}</Typography.Text>,
    },
    {
      key: "status",
      label: "Status",
      children: getStatusTag(user.data.data.status),
    },
    {
      key: "created_at",
      label: "Created At",
      children: (
        <Typography.Text strong>
          {user.data.data.created_at ? dayjs(user.data.data.created_at).format("DD-MM-YYYY") : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: (
        <Typography.Text strong>
          {user.data.data.updated_at ? dayjs(user.data.data.updated_at).format("DD-MM-YYYY") : "-"}
        </Typography.Text>
      ),
    },
  ];

  const permissionColumns = [
    {
      dataIndex: "menu",
      key: "menu",
      title: "Menu",
      sorter: true,
    },
    {
      dataIndex: "permissionType",
      title: "Permission Type",
      key: "permissionType",
      sorter: true,
    },
    {
      dataIndex: "totalUsers",
      title: "Total Users",
      key: "totalUsers",
      sorter: true,
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            type="primary"
            onClick={() => {
              Modal.confirm({
                title: "Reject User",
                content: "Are you sure you want to reject this user?",
                okText: "Yes",
                cancelText: "No",
                onOk() {
                  message.success("User successfully rejected");
                  navigate("/users");
                },
              });
            }}
            danger
            icon={<CheckCircleOutlined />}
          >
            Reject
          </Button>
          <Button
            htmlType="button"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => {
              Modal.confirm({
                title: "Approve User",
                content: "Are you sure you want to approve this user?",
                okText: "Yes",
                cancelText: "No",
                onOk() {
                  message.success("User successfully approved");
                  navigate("/users");
                },
              });
            }}
          >
            Approve
          </Button>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#faad14",
              },
            }}
          >
            <Button
              htmlType="button"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Revise User",
                  content: "Are you sure you want to revise this user?",
                  okText: "Yes",
                  cancelText: "No",
                  onOk() {
                    message.success("User successfully revised");
                    navigate("/users");
                  },
                });
              }}
            >
              Revise
            </Button>
          </ConfigProvider>
          <Link
            to={urlParser("/users/:id/update", {
              id: user.data.data.id,
            })}
          >
            <Button htmlType="button" type="default">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`User Details: ${user.data.data.fullName}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/users")}
      noStyle
    >
      <Section loading={user.loading}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Section title="General Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={items}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>
          <Section title="User Permissions">
            <DataTable
              rowKey="id"
              loading={permissions.loading}
              source={makeSource(permissions.data)}
              columns={permissionColumns}
              onChange={handleChange}
              hideSearch
              showRowSelection={false}
            />
          </Section>
          <Section title="Login Activity">
            <Steps
              progressDot
              current={loginActivities.length}
              direction="vertical"
              items={loginActivities.map((activity) => ({
                title: `Login: ${dayjs(activity.loginTime).format("DD-MM-YYYY HH:mm:ss")}`,
                subTitle: `Logout: ${dayjs(activity.logoutTime).format("DD-MM-YYYY HH:mm:ss")}`,
                description: (
                  <div>
                    <p>Device/Browser: {activity.device}</p>
                    <p>Total Online Time: {activity.totalOnlineTime}</p>
                  </div>
                ),
              }))}
            />
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
