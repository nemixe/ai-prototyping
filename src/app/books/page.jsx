import { Button, Flex, message, Row, Col, Checkbox } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import Datatable from "admiral/table/datatable/index";
import dayjs from "dayjs";
import { Link } from "react-router";
import { Page } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";

// Dummy data for books
const books = {
  data: {
    status_code: 200,
    data: {
      items: [
        {
          id: "1",
          isbn: "978-0-7475-3269-9",
          title: "Harry Potter and the Philosopher's Stone",
          year: 1997,
          created_at: "2023-10-01T00:00:00.000Z",
          updated_at: "2023-10-01T00:00:00.000Z",
          deleted_at: null,
        },
        {
          id: "2",
          isbn: "978-0-06-112008-4",
          title: "The Hobbit",
          year: 1937,
          created_at: "2023-10-01T00:00:00.000Z",
          updated_at: "2023-10-01T00:00:00.000Z",
          deleted_at: null,
        },
        {
          id: "3",
          isbn: "978-0-385-50420-5",
          title: "The Da Vinci Code",
          year: 2003,
          created_at: "2023-10-01T00:00:00.000Z",
          updated_at: "2023-10-01T00:00:00.000Z",
          deleted_at: null,
        },
      ],
      meta: {
        total_page: 1,
        total: 3,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  },
  loading: false,
};

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const columns = [
    {
      dataIndex: "isbn",
      key: "isbn",
      title: "ISBN",
      sorter: true,
    },
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
    },
    {
      dataIndex: "year",
      key: "year",
      title: "Year",
      sorter: true,
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      sorter: true,
      key: "createdAt",
      render: (_, record) => {
        return record.created_at ? dayjs(record.created_at).format("DD/MM/YYYY") : "-";
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/books/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Book successfully deleted");
              }}
            />
            <Link
              to={urlParser("/books/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Books",
      path: "/books",
    },
  ];

  return (
    <Page title="Books" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
      <Datatable
        filterComponents={[
          {
            label: "filter",
            name: "filter",
            type: "Group",
            icon: <FilterOutlined />,
            cols: 2,
            filters: [
              {
                label: "Title",
                name: "title",
                type: "Input",
                placeholder: "Search by title",
                defaultValue: filters.title,
              },
              {
                label: "ISBN",
                name: "isbn",
                type: "Input",
                placeholder: "Search by ISBN",
                defaultValue: filters.isbn,
              },
              {
                label: "Year",
                name: "year",
                type: "RangePicker",
                defaultValue: filters.year,
                picker: "year",
              },
              {
                label: "Created At",
                name: "date",
                type: "DateRangePicker",
                defaultValue: filters.date,
              },
            ],
          },
          {
            label: "Sort",
            title: "Sort",
            name: "sort",
            type: "Group",
            icon: <SortAscendingOutlined />,
            cols: 2,
            filters: [
              {
                label: "Field",
                name: "sort_by",
                type: "Select",
                placeholder: "Choose field",
                value: filters?.sort_by,
                options: [
                  {
                    label: "ISBN",
                    value: "isbn",
                  },
                  {
                    label: "Title",
                    value: "title",
                  },
                  {
                    label: "Year",
                    value: "year",
                  },
                ],
              },
              {
                label: <span style={{ color: "white" }}>.</span>,
                name: "order",
                type: "Select",
                placeholder: "Order",
                value: filters?.order,
                options: [
                  {
                    label: "Ascending",
                    value: "asc",
                  },
                  {
                    label: "Descending",
                    value: "desc",
                  },
                ],
              },
            ],
          },
        ]}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              message.success("Selected books successfully deleted");
              cb.reset();
            },
            danger: true,
            icon: <DeleteOutlined />,
          },
          {
            key: "download",
            label: "Download",
            onClick: (_values, cb) => {
              message.success("Books data successfully downloaded");
              cb.reset();
            },
            icon: <DeleteOutlined />,
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={books.loading}
        source={makeSource(books.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};

const TopAction = () => (
  <Link to={"/books/create"}>
    <Button icon={<PlusCircleOutlined />}>Add Book</Button>
  </Link>
);

export default Component;
