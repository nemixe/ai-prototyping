"use client";

import { Button, Form, Input, Select } from "antd";
import { FC } from "react";
import { FormProps } from "antd/lib";
import { useRolesOptionQuery } from "./use-roles-query";
import { UserFormSchema } from "./schema";
import { createZodSync } from "@/utils/zod-sync";
import { TResponseError } from "@/commons/types/response";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: TResponseError | null;
};

const rule = createZodSync(UserFormSchema);

export const FormUser: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(form, error);

  const rolesOptionQuery = useRolesOptionQuery();

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Full Name" name="fullname" rules={[rule]}>
        <Input placeholder="Admin" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[rule]}>
        <Input type="password" placeholder="Tulis password anda" />
      </Form.Item>
      <Form.Item label="email" name="email" rules={[rule]}>
        <Input type="email" placeholder="johndoe@gmail.com" />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[rule]}>
        <Input placeholder="Jalan No.7 Malang" />
      </Form.Item>
      <Form.Item label="Role" name="roleId" rules={[rule]}>
        <Select
          placeholder="Select Role"
          options={rolesOptionQuery.data}
          loading={rolesOptionQuery.isLoading}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
