import { Page } from "admiral";
import { message } from "antd";
import { useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";

import { FormBook } from "../../_components/form";

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

  const handleOnFinish = () => {
    navigate("/books");
    message.success("Book successfully updated");
  };

  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Books",
      path: "/books",
    },
    {
      label: book.data.data?.title ?? "-",
      path: urlParser("/books/:id", { id: book.data.data?.id ?? "" }),
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    isbn: book.data.data?.isbn,
    title: book.data.data?.title,
    year: book.data.data?.year,
  };

  return (
    <Page
      title={`Update Book: ${book.data.data.title}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/books")}
    >
      <FormBook
        isEdit
        key={book.data.data?.id}
        formProps={{
          onFinish: handleOnFinish,
          initialValues,
          disabled: false,
        }}
        error={null}
        loading={book.loading}
      />
    </Page>
  );
};

export default Component;
