import { Fragment, Suspense, type FC, type ReactElement } from "react";
import { Header } from "@/components/ui/header";
import { BREADCRUMB_ITEMS } from "@/common/constants/breadcrumb";
import { ROUTES } from "@/common/constants/routes";
import { ColumnsType } from "antd/es/table";
import { TUserItem } from "@/api/users/type";
import { Link } from "react-router-dom";
import { Flex } from "antd";
import { urlParser } from "@/utils/helper";
import { lazily } from "react-lazily";

const { DataTable } = lazily(() => import("@/components/ui/data-table"));

export const UserListTable: FC = (): ReactElement => {
  const columns: ColumnsType<TUserItem> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        return new Date(value).toLocaleDateString();
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => {
        return new Date(value).toLocaleDateString();
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex gap={10}>
            <Link
              to={urlParser(ROUTES.USERS.UPDATE, {
                id: record.id,
              })}
            >
              Update
            </Link>
            <Link to="#">Delete</Link>
          </Flex>
        );
      },
    },
  ];

  const data: TUserItem[] = [
    {
      id: 1,
      name: "John Doe",
      email: "jhon@mail.com",
      phone: "0891212314",
      address: "",
      status: "Active",
      createdAt: new Date("2021-08-01T00:00:00.000Z"),
      updatedAt: new Date("2021-08-01T00:00:00.000Z"),
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@mail.com",
      phone: "0891212314",
      address: "",
      status: "Active",
      createdAt: new Date("2021-08-01T00:00:00.000Z"),
      updatedAt: new Date("2021-08-01T00:00:00.000Z"),
    },
  ];
  return (
    <Fragment>
      <Header
        breadcrumb={BREADCRUMB_ITEMS.USERS.LIST}
        title={"User Management"}
        add={{ text: "Add User +", link: ROUTES.USERS.CREATE }}
      />
      <Suspense fallback={<div>Loading...</div>} />
      <DataTable columns={columns} data={data} loading={false} rowKey="id" />
      <Suspense />
    </Fragment>
  );
};
