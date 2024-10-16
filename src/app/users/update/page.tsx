import { Boundary } from "@/components/ui/boundary";
import { lazily } from "react-lazily";
import { UserUpdateError } from "./_components/user-update-error";
import { UserUpdateLoading } from "./_components/user-update-loading";

const { UserUpdateForm } = lazily(
  () => import("./_components/user-update-form")
);

export const UsersUpdatePage = () => {
  return (
    <Boundary error={<UserUpdateError />} loading={<UserUpdateLoading />}>
      <UserUpdateForm />;
    </Boundary>
  );
};
