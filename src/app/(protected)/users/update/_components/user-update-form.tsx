import { Fragment, type FC, type ReactElement } from "react";
import { Button, Form, Input, message } from "antd";
import { TUserUpdateRequest } from "@/api/users/type";
import { createZodSync } from "@/utils/zod-sync";
import { userSchema } from "@/api/users/schema";
import { usePutUpdateUser } from "../_hooks/use-put-update-user";

export const UserUpdateForm: FC = (): ReactElement => {
  const [form] = Form.useForm<TUserUpdateRequest>();
  const rule = createZodSync(userSchema);

  const { mutate } = usePutUpdateUser();

  const onFinish = (data: TUserUpdateRequest) => {
    mutate(data, {
      onSuccess: () => {
        message.success("User updated successfully");
      },
      onError: (err) => {
        message.error(err?.response?.data?.message || "Update failed");
      },
    });
  };

  return (
    <Fragment>
      <Form
        form={form}
        name="user_update"
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
