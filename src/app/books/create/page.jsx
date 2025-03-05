import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormBook } from "../_components/form";

export const Component = () => {
  const navigate = useNavigate();
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
      label: "Create Book",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Book successfully created");
    navigate("/books");
  };

  return (
    <Page title="Add Book" breadcrumbs={breadcrumb} noStyle goBack={() => navigate("/books")}>
      <FormBook formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
