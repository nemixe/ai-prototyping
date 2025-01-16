import { lazily } from "react-lazily";
import { UserUpdateError } from "./_components/user-update-error";
import { UserUpdateLoading } from "./_components/user-update-loading";
import { AppBoundary } from "@/app/_components/ui/app-boundary";
import { Page } from "admiral";
import { ROUTES } from "@/commons/constants/routes";

const { UserUpdateForm } = lazily(
  () => import("./_components/user-update-form"),
);

export const UsersUpdatePage = () => {
  return (
    <Page
      title="User Update"
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
          label: "User Update",
          path: ROUTES.USERS.UPDATE.URL,
        },
      ]}
    >
      <AppBoundary error={<UserUpdateError />} loading={<UserUpdateLoading />}>
        <UserUpdateForm />;
      </AppBoundary>
    </Page>
  );
};
