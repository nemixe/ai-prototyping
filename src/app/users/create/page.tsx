import type { FC, ReactElement } from "react";
import { lazily } from "react-lazily";
import { Boundary } from "@/components/ui/boundary";
import { UserCreateLoading } from "./_components/user-create-loading";
import { UserCreateError } from "./_components/user-create-error";

const { UserCreateForm } = lazily(
  () => import("./_components/user-create-form")
);

export const UsersCreatePage: FC = (): ReactElement => {
  return (
    <Boundary error={<UserCreateError />} loading={<UserCreateLoading />}>
      <UserCreateForm />
    </Boundary>
  );
};
