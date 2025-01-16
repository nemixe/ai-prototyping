import { AppBoundary } from "@/app/_components/ui/app-boundary";
import { UserListError } from "./_components/user-list-error";
import { UserListLoading } from "./_components/user-list-loading";
import { lazily } from "react-lazily";
import { Page } from "admiral";
import { ROUTES } from "@/commons/constants/routes";
import { Link } from "react-router-dom";
import { Button } from "antd";

const { UserListTable } = lazily(() => import("./_components/user-list-table"));

export const UsersListPage = () => {
  return (
    <Page
      title="User Management"
      topActions={<TopActions />}
      breadcrumbs={[
        {
          label: "Dashboard",
          path: ROUTES.DASHBOARD.URL,
        },
      ]}
    >
      <AppBoundary error={<UserListError />} loading={<UserListLoading />}>
        <UserListTable />
      </AppBoundary>
    </Page>
  );
};

const TopActions = () => {
  return (
    <Link to={ROUTES.USERS.CREATE.URL}>
      <Button type="primary">Add User +</Button>
    </Link>
  );
};
