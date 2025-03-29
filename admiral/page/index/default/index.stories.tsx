import { Meta, StoryFn } from "@storybook/react";

import { ThemeProvider } from "../../../context/theme";
import DataTable from "../../../table/datatable";
import { PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import MainLayout from "../../../layout/main-layout";
import { Page } from "../../../layout";
import { Button } from "antd";

export default {
  title: "Example Page/IndexPage/Default",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Index Page is a page for displaying data. Example usage of DataTable component.",
      },
    },
  },
} as Meta;

const Template: StoryFn = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Name",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tanggal",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
    },
  ];
  const dataSource = [
    {
      id: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const handleChangeFilter = (values: unknown) => {
    console.log(values);
  };
  const handleBatchDelete = (selected: unknown) => {
    console.log("batch delete ", selected);
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
          breadcrumbs={[
            {
              label: "Dashboard",
              path: "/",
            },
            {
              label: "User",
              path: "/user",
            },
          ]}
          title="User"
          topActions={<Button icon={<PlusOutlined />}>Create</Button>}
        >
          <DataTable
            rowKey={"id"}
            columns={columns}
            source={{ data: dataSource }}
            onChange={handleChangeFilter}
            filterComponents={[
              {
                label: "Name",
                name: "name",
                type: "Select",
                options: [
                  {
                    label: "Name 1",
                    value: "Name 1",
                  },
                  {
                    label: "Name 2",
                    value: "Name 2",
                  },
                ],
                placeholder: "Filter",
              },
            ]}
            className="admiral-table"
            batchActionMenus={[
              {
                key: "id",
                label: "Delete",
                onClick: handleBatchDelete,
                icon: <ShareAltOutlined />,
              },
            ]}
          />
        </Page>
      </MainLayout>
    </ThemeProvider>
  );
};

export const Default = Template.bind({});

Default.args = {};
