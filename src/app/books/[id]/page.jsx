import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message, Typography } from "antd";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";

// Dummy data for a book
const book = {
  data: {
    status_code: 200,
    data: {
      id: "1",
      isbn: "978-0-7475-3269-9",
      title: "Harry Potter and the Philosopher's Stone",
      year: 1997,
      created_at: "2023-10-01T00:00:00.000Z",
      updated_at: "2023-10-01T00:00:00.000Z",
      deleted_at: null,
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
      label: "Books",
      path: "/books",
    },
    {
      label: book.data.data.title,
      path: "#",
    },
  ];

  const items = [
    {
      key: "isbn",
      label: "ISBN",
      children: <Typography.Text strong>{book.data.data.isbn ?? "-"}</Typography.Text>,
    },
    {
      key: "title",
      label: "Title",
      children: <Typography.Text strong>{book.data.data.title ?? "-"}</Typography.Text>,
    },
    {
      key: "year",
      label: "Year",
      children: <Typography.Text strong>{book.data.data.year ?? "-"}</Typography.Text>,
    },
    {
      key: "created_at",
      label: "Created At",
      children: (
        <Typography.Text strong>
          {book.data.data?.created_at
            ? dayjs(book.data.data?.created_at).format("DD/MM/YYYY")
            : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: (
        <Typography.Text strong>
          {book.data.data?.updated_at
            ? dayjs(book.data.data?.updated_at).format("DD/MM/YYYY")
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
              message.success("Book successfully deleted");
              navigate("/books");
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={urlParser("/books/:id/update", {
              id: book.data.data.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Book Details: ${book.data.data.title}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/books")}
      noStyle
    >
      <Section loading={book.loading}>
        <Section title="Book Information">
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
