import { AppBoundary } from "@/app/_components/ui/app-boundary";
import { UserListError } from "./_components/user-list-error";
import { UserListLoading } from "./_components/user-list-loading";
import { lazily } from "react-lazily";
import { Page } from "admiral";

const { UserListTable } = lazily(() => import("./_components/user-list-table"));

export const UsersListPage = () => {
  return (
    <Page title="User List">
      <AppBoundary error={<UserListError />} loading={<UserListLoading />}>
        <UserListTable />
      </AppBoundary>
    </Page>
  );
};
