import { Button, Flex } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { ActionTable, Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import { makeSource } from "@/utils/data-table";
import dayjs from "dayjs";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { Link } from "react-router";
import { urlParser } from "@/utils/url-parser";
import { useGetBooks } from "./hook";
import { TBookItem } from "./type";

export const Component = () => {
  const { handleChange, pagination, filters, setFilters } = useFilter();
  const booksQuery = useGetBooks(pagination);

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
          loading={booksQuery.isLoading}
          source={makeSource(booksQuery.data)}
          columns={columns}
          search={filters.search}
        />
      </div>
    </Page>
  );
};

export default Component;
