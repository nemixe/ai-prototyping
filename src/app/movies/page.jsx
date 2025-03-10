import { useState } from "react";
import { Button, Flex, message, Space } from "antd";
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
import { ActionTable, Page, Tabs } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { Checkbox, Col, Row } from "antd";

// Sample movie data
const allMovies = {
  data: {
    status_code: 200,
    data: {
      items: [
        {
          id: "1",
          title: "Inception",
          releaseDate: "2010-07-16",
          director: "Christopher Nolan",
          totalCopies: 50,
          createdAt: "2023-10-01T00:00:00.000Z",
          updatedAt: "2023-10-01T00:00:00.000Z",
        },
        {
          id: "2",
          title: "The Matrix",
          releaseDate: "1999-03-31",
          director: "Lana Wachowski",
          totalCopies: 75,
          createdAt: "2023-10-02T00:00:00.000Z",
          updatedAt: "2023-10-02T00:00:00.000Z",
        },
        {
          id: "3",
          title: "Interstellar",
          releaseDate: "2014-11-07",
          director: "Christopher Nolan",
          totalCopies: 40,
          createdAt: "2023-10-03T00:00:00.000Z",
          updatedAt: "2023-10-03T00:00:00.000Z",
        },
        {
          id: "4",
          title: "Pulp Fiction",
          releaseDate: "1994-10-14",
          director: "Quentin Tarantino",
          totalCopies: 60,
          createdAt: "2023-10-04T00:00:00.000Z",
          updatedAt: "2023-10-04T00:00:00.000Z",
        },
        {
          id: "5",
          title: "The Shawshank Redemption",
          releaseDate: "1994-09-23",
          director: "Frank Darabont",
          totalCopies: 55,
          createdAt: "2023-10-05T00:00:00.000Z",
          updatedAt: "2023-10-05T00:00:00.000Z",
        },
        {
          id: "6",
          title: "Forrest Gump",
          releaseDate: "1994-07-06",
          director: "Robert Zemeckis",
          totalCopies: 65,
          createdAt: "2023-10-06T00:00:00.000Z",
          updatedAt: "2023-10-06T00:00:00.000Z",
        },
        {
          id: "7",
          title: "The Dark Knight",
          releaseDate: "2008-07-18",
          director: "Christopher Nolan",
          totalCopies: 80,
          createdAt: "2023-10-07T00:00:00.000Z",
          updatedAt: "2023-10-07T00:00:00.000Z",
        },
        {
          id: "8",
          title: "Goodfellas",
          releaseDate: "1990-09-19",
          director: "Martin Scorsese",
          totalCopies: 45,
          createdAt: "2023-10-08T00:00:00.000Z",
          updatedAt: "2023-10-08T00:00:00.000Z",
        },
        {
          id: "9",
          title: "Fight Club",
          releaseDate: "1999-10-15",
          director: "David Fincher",
          totalCopies: 55,
          createdAt: "2023-10-09T00:00:00.000Z",
          updatedAt: "2023-10-09T00:00:00.000Z",
        },
        {
          id: "10",
          title: "The Godfather",
          releaseDate: "1972-03-24",
          director: "Francis Ford Coppola",
          totalCopies: 70,
          createdAt: "2023-10-10T00:00:00.000Z",
          updatedAt: "2023-10-10T00:00:00.000Z",
        }
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

const trendingMovies = {
  data: {
    status_code: 200,
    data: {
      items: [
        {
          id: "1",
          title: "Inception",
          releaseDate: "2010-07-16",
          director: "Christopher Nolan",
          viewsThisMonth: 5000,
          socialMentions: 12500,
          createdAt: "2023-10-01T00:00:00.000Z",
          updatedAt: "2023-10-01T00:00:00.000Z",
        },
        {
          id: "7",
          title: "The Dark Knight",
          releaseDate: "2008-07-18",
          director: "Christopher Nolan",
          viewsThisMonth: 4800,
          socialMentions: 11200,
          createdAt: "2023-10-07T00:00:00.000Z",
          updatedAt: "2023-10-07T00:00:00.000Z",
        },
        {
          id: "3",
          title: "Interstellar",
          releaseDate: "2014-11-07",
          director: "Christopher Nolan",
          viewsThisMonth: 4500,
          socialMentions: 10000,
          createdAt: "2023-10-03T00:00:00.000Z",
          updatedAt: "2023-10-03T00:00:00.000Z",
        }
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const allMovieColumns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
    },
    {
      dataIndex: "releaseDate",
      title: "Release Date",
      key: "releaseDate",
      sorter: true,
      render: (_, record) => {
        return record.releaseDate ? dayjs(record.releaseDate).format("DD/MM/YYYY") : "-";
      },
    },
    {
      dataIndex: "director",
      title: "Director",
      key: "director",
      sorter: true,
    },
    {
      dataIndex: "totalCopies",
      title: "Total Copies",
      key: "totalCopies",
      sorter: true,
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      key: "createdAt",
      sorter: true,
      render: (_, record) => {
        return record.createdAt ? dayjs(record.createdAt).format("DD/MM/YYYY") : "-";
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
              to={urlParser("/movies/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Movie successfully deleted");
              }}
            />
            <Link
              to={urlParser("/movies/:id/update", {
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

  const trendingMovieColumns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
    },
    {
      dataIndex: "releaseDate",
      title: "Release Date",
      key: "releaseDate",
      sorter: true,
      render: (_, record) => {
        return record.releaseDate ? dayjs(record.releaseDate).format("DD/MM/YYYY") : "-";
      },
    },
    {
      dataIndex: "director",
      title: "Director",
      key: "director",
      sorter: true,
    },
    {
      dataIndex: "viewsThisMonth",
      title: "Views This Month",
      key: "viewsThisMonth",
      sorter: true,
    },
    {
      dataIndex: "socialMentions",
      title: "Social Mentions",
      key: "socialMentions",
      sorter: true,
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/movies/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Movie successfully deleted");
              }}
            />
            <Link
              to={urlParser("/movies/:id/update", {
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
      label: "Movies",
      path: "/movies",
    },
  ];

  return (
    <Page title="Movies" breadcrumbs={breadcrumbs} topActions={<TopAction />} noStyle>
      <Space direction="vertical" style={{ width: "100%" }}>
        <ActionTable
          filters={[
            {
              label: "filter",
              name: "filter",
              type: "Group",
              icon: <FilterOutlined />,
              cols: 2,
              filters: [
                {
                  label: "Director",
                  name: "director",
                  type: "Select",
                  placeholder: "Select director",
                  defaultValue: filters.director,
                  options: [
                    { label: "Christopher Nolan", value: "Christopher Nolan" },
                    { label: "Quentin Tarantino", value: "Quentin Tarantino" },
                    { label: "Martin Scorsese", value: "Martin Scorsese" },
                    { label: "David Fincher", value: "David Fincher" },
                  ],
                },
                {
                  label: "Release Date",
                  name: "releaseDate",
                  type: "DateRangePicker",
                  defaultValue: filters.releaseDate,
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
                    { label: "Director", value: "director" },
                    { label: "Release Date", value: "releaseDate" },
                    { label: "Total Copies", value: "totalCopies" },
                  ],
                },
                {
                  label: <span style={{ color: "white" }}>.</span>,
                  name: "order",
                  type: "Select",
                  placeholder: "Order",
                  value: filters?.order,
                  options: [
                    { label: "Ascending", value: "asc" },
                    { label: "Descending", value: "desc" },
                  ],
                },
              ],
            },
          ]}
          selectedRows={selectedRowKeys}
          batchActionMenus={[
            {
              key: "delete",
              label: "Delete",
              onClick: (_values, cb) => {
                message.success("Selected movies successfully deleted");
                cb.reset();
                setSelectedRowKeys([]);
              },
              danger: true,
              icon: <DeleteOutlined />,
            },
          ]}
        />
        <Tabs
          type="bordered-card"
          items={[
            {
              label: "All Movies",
              key: "all",
              children: (
                <Datatable
                  onChange={handleChange}
                  rowKey="id"
                  loading={allMovies.loading}
                  source={makeSource(allMovies.data)}
                  columns={allMovieColumns}
                  search={filters.search}
                  hideSearch
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRows) => setSelectedRowKeys(selectedRows),
                  }}
                />
              ),
            },
            {
              label: "Trending",
              key: "trending",
              children: (
                <Datatable
                  onChange={handleChange}
                  rowKey="id"
                  loading={trendingMovies.loading}
                  source={makeSource(trendingMovies.data)}
                  columns={trendingMovieColumns}
                  search={trendingMovies.search}
                  hideSearch
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRows) => setSelectedRowKeys(selectedRows),
                  }}
                />
              ),
            },
          ]}
        />
      </Space>
    </Page>
  );
};

const TopAction = () => (
  <Link to={"/movies/create"}>
    <Button icon={<PlusCircleOutlined />}>Add Movie</Button>
  </Link>
);

export default Component;
