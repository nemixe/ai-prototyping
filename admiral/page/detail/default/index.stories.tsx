import { Meta, StoryFn } from "@storybook/react";

import { Button, Descriptions, Flex, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import Section from "../../../section";
import MainLayout from "../../../layout/main-layout";
import { ThemeProvider } from "../../../context";
import { Page } from "../../../layout";

export default {
  title: "Example Page/DetailPage/Default",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Detail Page is a page for displaying detail information.",
      },
    },
  },
} as Meta;

const Template: StoryFn = () => {
  // Dummy Data for table content
  const data = [
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "1234567890",
    },
    {
      id: 2,
      name: "Jane Doe",
      phoneNumber: "2345678901",
    },
    {
      id: 3,
      name: "Peter Parker",
      phoneNumber: "3456789012",
    },
    {
      id: 4,
      name: "Mary Jane",
      phoneNumber: "4567890123",
    },
    {
      id: 5,
      name: "Tony Stark",
      phoneNumber: "5678901234",
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  const Breadcrumbs = {
    DETAIL: [
      {
        label: "Page Lists",
        path: "#",
      },
      {
        label: "Page Detail",
        path: "#",
      },
    ],
  };

  return (
    <ThemeProvider>
      <MainLayout
        header={{
          brandLogo: <div>Your brand logo goes here</div>,
        }}
        sidebar={{
          defaultOpenKeys: ["sub1"],
          defaultSelectedKeys: ["1"],
          menu: [
            {
              key: "1",
              label: "Option 1",
            },
            {
              key: "2",
              label: "Option 2",
            },
          ],
          width: 232,
        }}
      >
        <Page
          breadcrumbs={Breadcrumbs.DETAIL}
          title="Detail User"
          topActions={
            <>
              <Button icon={<DeleteOutlined />}>Delete</Button>
              <Link href="#">
                <Button icon={<EditOutlined />}>Edit</Button>
              </Link>
            </>
          }
          goBack={(): void => console.log("Go back")}
        >
          <Flex gap={16} vertical>
            <Section title="User Info">
              <Descriptions bordered>
                <Descriptions.Item label="ID" span={2}>
                  1
                </Descriptions.Item>
                <Descriptions.Item label="Name" span={2}>
                  John Doe
                </Descriptions.Item>
                <Descriptions.Item label="Handphone" span={2}>
                  +628123456789
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                  Indonesia
                </Descriptions.Item>
              </Descriptions>
            </Section>

            <Section title="Advanced Information">
              <Descriptions bordered>
                <Descriptions.Item label="ID Number" span={2}>
                  55501212211212
                </Descriptions.Item>
                <Descriptions.Item label="Name" span={2}>
                  John Doe
                </Descriptions.Item>
                <Descriptions.Item label="Handphone" span={2}>
                  +628123456789
                </Descriptions.Item>
              </Descriptions>
            </Section>

            <Section title="Data Information">
              <Table dataSource={data} columns={columns} />
            </Section>
          </Flex>
        </Page>
      </MainLayout>
    </ThemeProvider>
  );
};

export const Detail = Template.bind({});

Detail.args = {};
