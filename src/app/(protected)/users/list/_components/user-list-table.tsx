import { Fragment, type FC, type ReactElement } from "react";
import { ColumnsType } from "antd/es/table";
import { TUserItem } from "@/api/users/type";
import { Link } from "react-router-dom";
import { Flex } from "antd";
import { lazily } from "react-lazily";
import { urlParser } from "@/utils/url-parser";
import { ROUTES } from "@/commons/constants/routes";

const { DataTable } = lazily(() => import("admiral"));

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
              to={urlParser(ROUTES.USERS.UPDATE.URL, {
                id: record.id,
              })}
            >
              Update
            </Link>
            <Link
              to={urlParser(ROUTES.USERS.DETAIL.URL, {
                id: record.id,
              })}
            >
              Detail
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
      role: {
        id: "1",
        name: "Admin",
        permissions: [
          {
            id: "1",
            name: "Read Dashboard",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@mail.com",
      phone: "0891212314",
      address: "",
      status: "Active",
      role: {
        id: "1",
        name: "Admin",
        permissions: [
          {
            id: "1",
            name: "Read Dashboard",
          },
        ],
      },
      createdAt: new Date("2021-08-01T00:00:00.000Z"),
      updatedAt: new Date("2021-08-01T00:00:00.000Z"),
    },
  ];
  return (
    <Fragment>
      <DataTable
        columns={columns}
        source={{ data, meta: { pageSize: 10 } }}
        loading={false}
        hideSearch
        rowKey="id"
      />
    </Fragment>
  );
};
