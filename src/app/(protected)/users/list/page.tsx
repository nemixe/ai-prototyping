import { Boundary } from "@/components/ui/boundary";
import { UserListError } from "./_components/user-list-error";
import { UserListLoading } from "./_components/user-list-loading";
import { lazily } from "react-lazily";

const { UserListTable } = lazily(() => import("./_components/user-list-table"));

export const UsersListPage = () => {
  return (
    <Boundary error={<UserListError />} loading={<UserListLoading />}>
      <UserListTable />
    </Boundary>
  );
};
