import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormMovie } from "../_components/form";

export const Component = () => {
  const navigate = useNavigate();
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
      label: "Create Movie",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Movie successfully created");
    navigate("/movies");
  };

  return (
    <Page 
      title="Add Movie" 
      breadcrumbs={breadcrumb} 
      noStyle 
      goBack={() => navigate("/movies")}
    >
      <FormMovie 
        formProps={{ onFinish: handleOnFinish }} 
        error={null} 
        loading={false} 
      />
    </Page>
  );
};

export default Component;
