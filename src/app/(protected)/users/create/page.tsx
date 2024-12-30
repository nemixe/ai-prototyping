import type { FC, ReactElement } from "react";
import { lazily } from "react-lazily";
import { UserCreateLoading } from "./_components/user-create-loading";
import { UserCreateError } from "./_components/user-create-error";
import { AppBoundary } from "@/app/_components/ui/app-boundary";

const { UserCreateForm } = lazily(
  () => import("./_components/user-create-form"),
);

export const UsersCreatePage: FC = (): ReactElement => {
  return (
    <AppBoundary error={<UserCreateError />} loading={<UserCreateLoading />}>
      <UserCreateForm />
    </AppBoundary>
  );
};
