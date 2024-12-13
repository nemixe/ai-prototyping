import { Fragment, type FC, type ReactElement } from "react";
import { Button, Form, Input, message } from "antd";
import { TUserCreateRequest } from "@/api/users/type";
import { usePostCreateUser } from "../_hooks/use-post-create-user";
import { USER_CREATE_BREADCRUMB } from "../_constants/user-create-breadcrumb";
import { createZodSync } from "@/utils/zod-sync";
import { userSchema } from "@/api/users/schema";
import { Header } from "@/app/(protected)/_components/ui/header";

export const UserCreateForm: FC = (): ReactElement => {
  const [form] = Form.useForm<TUserCreateRequest>();

  const rule = createZodSync(userSchema);

  const { mutate } = usePostCreateUser();

  const onFinish = (data: TUserCreateRequest) => {
    mutate(data, {
      onSuccess: () => {
        message.success("User created successfully");
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    });
  };

  return (
    <Fragment>
      <Header breadcrumb={USER_CREATE_BREADCRUMB} title={"User Create"} />
      <Form
        form={form}
        name="user_create"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
        }}
      >
        <Form.Item name="name" label="Full Name" rules={[rule]}>
          <Input placeholder="Input Fullname" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[rule]}>
          <Input placeholder="Input Email" />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number" rules={[rule]}>
          <Input placeholder="Input Phone Number" type="number" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[rule]}>
          <Input.TextArea placeholder="Input Address" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};
