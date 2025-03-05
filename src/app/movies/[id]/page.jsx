import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";

import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";
import { Typography } from "antd";

// Sample movie data (replace with actual data source later)
const movie = {
  data: {
    status_code: 200,
    data: {
      id: "1",
      title: "Inception",
      director: "Christopher Nolan",
      releaseDate: "2010-07-16",
      totalCopies: 50,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
    version: "1.0.0",
  },
  loading: false,
};

export const Component = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Movies",
      path: "/movies",
    },
    {
      label: movie.data.data.title,
      path: "#",
    },
  ];

  const items = [
    {
      key: "title",
      label: "Title",
      children: <Typography.Text strong>{movie.data.data.title ?? "-"}</Typography.Text>,
    },
    {
      key: "director",
      label: "Director",
      children: <Typography.Text strong>{movie.data.data.director ?? "-"}</Typography.Text>,
    },
    {
      key: "releaseDate",
      label: "Release Date",
      children: (
        <Typography.Text strong>
          {movie.data.data?.releaseDate
            ? dayjs(movie.data.data?.releaseDate).format("DD/MM/YYYY")
            : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "totalCopies",
      label: "Total Copies",
      children: <Typography.Text strong>{movie.data.data.totalCopies ?? "-"}</Typography.Text>,
    },
    {
      key: "createdAt",
      label: "Created At",
      children: (
        <Typography.Text strong>
          {movie.data.data?.createdAt
            ? dayjs(movie.data.data?.createdAt).format("DD/MM/YYYY")
            : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated At",
      children: (
        <Typography.Text strong>
          {movie.data.data?.updatedAt
            ? dayjs(movie.data.data?.updatedAt).format("DD/MM/YYYY")
            : "-"}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              message.success("Movie berhasil dihapus");
              navigate("/movies");
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={urlParser("/movies/:id/update", {
              id: movie.data.data.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Detail Movie ${movie.data.data.title}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/movies")}
      noStyle
    >
      <Section loading={movie.loading}>
        <Section title="Movie Information">
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
      </Section>
    </Page>
  );
};

export default Component;
