import { AppBoundary } from "@/app/_components/ui/app-boundary";
import { UserListError } from "./_components/user-list-error";
import { UserListLoading } from "./_components/user-list-loading";
import { lazily } from "react-lazily";

const { UserListTable } = lazily(() => import("./_components/user-list-table"));

export const UsersListPage = () => {
  return (
    <AppBoundary error={<UserListError />} loading={<UserListLoading />}>
      <UserListTable />
    </AppBoundary>
  );
};
