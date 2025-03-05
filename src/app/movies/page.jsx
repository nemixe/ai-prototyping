import { Button, Col, Flex, message, Row } from "antd";
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
import { Checkbox } from "antd";

// Sample movies data (replace with actual data source later)
const movies = {
  data: {
    status_code: 200,
    data: {
      items: [
        {
          id: "1",
          title: "Inception",
          director: "Christopher Nolan",
          releaseDate: "2010-07-16",
          totalCopies: 50,
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
          id: "2",
          title: "The Matrix",
          director: "Lana Wachowski",
          releaseDate: "1999-03-31",
          totalCopies: 75,
          createdAt: "2023-01-02T00:00:00.000Z",
          updatedAt: "2023-01-02T00:00:00.000Z",
        },
        {
          id: "3",
          title: "Interstellar",
          director: "Christopher Nolan",
          releaseDate: "2014-11-07",
          totalCopies: 40,
          createdAt: "2023-01-03T00:00:00.000Z",
          updatedAt: "2023-01-03T00:00:00.000Z",
        },
        {
          id: "4",
          title: "Pulp Fiction",
          director: "Quentin Tarantino",
          releaseDate: "1994-10-14",
          totalCopies: 60,
          createdAt: "2023-01-04T00:00:00.000Z",
          updatedAt: "2023-01-04T00:00:00.000Z",
        },
        {
          id: "5",
          title: "The Shawshank Redemption",
          director: "Frank Darabont",
          releaseDate: "1994-09-23",
          totalCopies: 55,
          createdAt: "2023-01-05T00:00:00.000Z",
          updatedAt: "2023-01-05T00:00:00.000Z",
        },
        {
          id: "6",
          title: "Forrest Gump",
          director: "Robert Zemeckis",
          releaseDate: "1994-07-06",
          totalCopies: 45,
          createdAt: "2023-01-06T00:00:00.000Z",
          updatedAt: "2023-01-06T00:00:00.000Z",
        },
        {
          id: "7",
          title: "The Dark Knight",
          director: "Christopher Nolan",
          releaseDate: "2008-07-18",
          totalCopies: 65,
          createdAt: "2023-01-07T00:00:00.000Z",
          updatedAt: "2023-01-07T00:00:00.000Z",
        },
        {
          id: "8",
          title: "Fight Club",
          director: "David Fincher",
          releaseDate: "1999-10-15",
          totalCopies: 55,
          createdAt: "2023-01-08T00:00:00.000Z",
          updatedAt: "2023-01-08T00:00:00.000Z",
        },
        {
          id: "9",
          title: "The Godfather",
          director: "Francis Ford Coppola",
          releaseDate: "1972-03-24",
          totalCopies: 70,
          createdAt: "2023-01-09T00:00:00.000Z",
          updatedAt: "2023-01-09T00:00:00.000Z",
        },
        {
          id: "10",
          title: "Goodfellas",
          director: "Martin Scorsese",
          releaseDate: "1990-09-19",
          totalCopies: 50,
          createdAt: "2023-01-10T00:00:00.000Z",
          updatedAt: "2023-01-10T00:00:00.000Z",
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

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const columns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
    },
    {
      dataIndex: "director",
      title: "Director",
      key: "director",
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
                message.success("Movie berhasil dihapus");
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
                label: "Director",
                name: "director",
                type: "Select",
                placeholder: "Select director",
                defaultValue: filters.director,
                options: [
                  { label: "Christopher Nolan", value: "Christopher Nolan" },
                  { label: "Quentin Tarantino", value: "Quentin Tarantino" },
                  { label: "Frank Darabont", value: "Frank Darabont" },
                  { label: "Robert Zemeckis", value: "Robert Zemeckis" },
                  { label: "David Fincher", value: "David Fincher" },
                  { label: "Francis Ford Coppola", value: "Francis Ford Coppola" },
                  { label: "Martin Scorsese", value: "Martin Scorsese" },
                ],
              },
              {
                label: "Release Date",
                name: "releaseDate",
                type: "DateRangePicker",
                defaultValue: filters.releaseDate,
              },
              {
                label: "Total Copies",
                name: "totalCopies",
                type: "Select",
                placeholder: "Select total copies range",
                defaultValue: filters.totalCopies,
                options: [
                  { label: "0-25", value: "0-25" },
                  { label: "26-50", value: "26-50" },
                  { label: "51-75", value: "51-75" },
                  { label: "76-100", value: "76-100" },
                ],
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
                  { label: "Title", value: "title" },
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
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              message.success("Movies berhasil dihapus");
              cb.reset();
            },
            danger: true,
            icon: <DeleteOutlined />,
          },
          {
            key: "download",
            label: "Download",
            onClick: (_values, cb) => {
              message.success("Movies berhasil didownload");
              cb.reset();
            },
            icon: <DeleteOutlined />,
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={movies.loading}
        source={makeSource(movies.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};

const TopAction = () => (
  <Link to={"/movies/create"}>
    <Button icon={<PlusCircleOutlined />}>Add Movie</Button>
  </Link>
);

export default Component;
