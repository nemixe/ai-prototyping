import { Page } from "admiral";
import { message } from "antd";
import { useNavigate } from "react-router";
import { urlParser } from "@/utils/url-parser";

import { FormMovie } from "../../_components/form";
import dayjs from "dayjs";

const movie = {
  data: {
    status_code: 200,
    data: {
      id: "1",
      title: "Inception",
      releaseDate: "2010-07-16",
      director: "Christopher Nolan",
      totalCopies: 50,
      createdAt: "2023-10-01T00:00:00.000Z",
      updatedAt: "2023-10-01T00:00:00.000Z",
    },
    version: "1.0.0",
  },
  loading: false,
};

export const Component = () => {
  const navigate = useNavigate();

  const handleOnFinish = () => {
    navigate("/movies");
    message.success("Movie successfully updated");
  };

  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Movies",
      path: "/movies",
    },
    {
      label: movie.data.data?.title ?? "-",
      path: urlParser("/movies/:id", { id: movie.data.data?.id ?? "" }),
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    title: movie.data.data?.title,
    director: movie.data.data?.director,
    releaseDate: movie.data.data?.releaseDate ? dayjs(movie.data.data.releaseDate) : null,
    totalCopies: movie.data.data?.totalCopies,
  };

  return (
    <Page
      title={`Update Movie: ${movie.data.data.title}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/movies")}
    >
      <FormMovie
        isEdit
        key={movie.data.data?.id}
        formProps={{
          onFinish: handleOnFinish,
          initialValues,
          disabled: false,
        }}
        error={null}
        loading={movie.loading}
      />
    </Page>
  );
};

export default Component;
