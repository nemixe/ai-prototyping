import { lazily } from "react-lazily";
import { UserUpdateError } from "./_components/user-update-error";
import { UserUpdateLoading } from "./_components/user-update-loading";
import { AppBoundary } from "@/app/_components/ui/app-boundary";
import { Page } from "admiral";

const { UserUpdateForm } = lazily(
  () => import("./_components/user-update-form"),
);

export const UsersUpdatePage = () => {
  return (
    <Page title="Update User">
      <AppBoundary error={<UserUpdateError />} loading={<UserUpdateLoading />}>
        <UserUpdateForm />;
      </AppBoundary>
    </Page>
  );
};
