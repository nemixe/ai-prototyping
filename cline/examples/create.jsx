import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormRole } from "./form";

const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: "Create Role",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Role berhasil dibuat");
    navigate("/roles");
  };

  return (
    <Page title="Add Role" breadcrumbs={breadcrumb} noStyle goBack={() => navigate("/roles")}>
      <FormRole formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};
export default Component;
