import type { FC, ReactElement } from "react";
import { lazily } from "react-lazily";
import { UserCreateLoading } from "./_components/user-create-loading";
import { UserCreateError } from "./_components/user-create-error";
import { AppBoundary } from "@/app/_components/ui/app-boundary";
import { Page } from "admiral";
import { ROUTES } from "@/commons/constants/routes";

const { UserCreateForm } = lazily(
  () => import("./_components/user-create-form"),
);

export const UsersCreatePage: FC = (): ReactElement => {
  return (
    <Page
      title="Create User"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: ROUTES.DASHBOARD.URL,
        },
        {
          label: "User List",
          path: ROUTES.USERS.LIST.URL,
        },
        {
          label: "User Create",
          path: ROUTES.USERS.CREATE.URL,
        },
      ]}
    >
      <AppBoundary error={<UserCreateError />} loading={<UserCreateLoading />}>
        <UserCreateForm />
      </AppBoundary>
    </Page>
  );
};
