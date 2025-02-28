import { Button, Flex } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { ActionTable, Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import dayjs from "dayjs";
import { Link } from "react-router";

import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { makeSource } from "@/utils/data-table";

import { TBookItem, TBookResponse } from "./type";

const getBooks = (params: unknown): TBookResponse => {
  console.log(params);
  return {
    status_code: 200,
    data: {
      items: [
        {
          id: "1",
          title: "The Great Gatsby",
          year: 1925,
          publish_date: "1925-04-10",
        },
        {
          id: "2",
          title: "To Kill a Mockingbird",
          year: 1960,
          publish_date: "1960-07-11",
        },
        {
          id: "3",
          title: "1984",
          year: 1949,
          publish_date: "1949-06-08",
        },
      ],
      meta: {
        total_page: 1,
        total: 2,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};
export const Component = () => {
  const { handleChange, pagination, filters, setFilters } = useFilter();
  const booksData = getBooks(pagination);

  const columns: ColumnsType<TBookItem> = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "year",
      title: "Year",
      key: "year",
    },
    {
      dataIndex: "publish_date",
      title: "Publish Date",
      key: "publish_date",
      render: (_, record) => {
        return record.publish_date ? dayjs(record.publish_date).format("DD/MM/YYYY") : "-";
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
              to={urlParser("/books/detail/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
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
    <Page title="Books" breadcrumbs={breadcrumbs} noStyle>
      <ActionTable
        onSearch={(value) => setFilters({ search: value })}
        searchValue={filters.search}
      />
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          marginTop: "10px",
        }}
      >
        <Datatable
          onChange={handleChange}
          rowKey="id"
          showRowSelection={false}
          loading={false}
          source={makeSource(booksData)}
          columns={columns}
          search={filters.search}
        />
      </div>
    </Page>
  );
};

export default Component;
