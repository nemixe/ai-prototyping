import { Fragment, type FC, type ReactElement } from "react";
import { Button, Form, Input } from "antd";
import { TUserCreateRequest } from "@/api/users/type";
import { Header } from "@/components/ui/header";
import { BREADCRUMB_ITEMS } from "@/common/constants/breadcrumb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/api/users/schema";
import { FormItem } from "react-hook-form-antd";
import { usePostCreateUser } from "../_hooks/use-post-create-user";

export const UserCreateForm: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm<TUserCreateRequest>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: zodResolver(userSchema),
  });

  const { mutate } = usePostCreateUser();

  const onFinish = handleSubmit((data) =>
    mutate(data, {
      onSuccess: (resp) => {
        console.log("Success", resp);
      },
      onError: (err) => {
        console.log(err);
      },
    })
  );

  return (
    <Fragment>
      <Header
        breadcrumb={BREADCRUMB_ITEMS.USERS.CREATE}
        title={"User Create"}
      />
      <Form name="user_create" layout="vertical" onFinish={onFinish}>
        <FormItem control={control} name="name" label="Full Name">
          <Input placeholder="Input Fullname" />
        </FormItem>
        <FormItem control={control} name="email" label="Email">
          <Input placeholder="Input Email" />
        </FormItem>
        <FormItem control={control} name="phone" label="Phone Number">
          <Input placeholder="Input Phone Number" type="number" />
        </FormItem>
        <FormItem control={control} name="address" label="Address">
          <Input.TextArea placeholder="Input Address" />
        </FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};
