import type { FC, ReactElement } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { FormProps } from "antd/lib";
import { createZodSync } from "@/utils/zod-sync";
import { UserFormSchema } from "./schema";
import { TResponseError } from "@/commons/types/response";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

type TProps = {
  formProps: FormProps;
  loading: boolean;
  error: TResponseError | null;
};

const rule = createZodSync(UserFormSchema);

export const FormUser: FC<TProps> = ({ formProps, error, loading }): ReactElement => {
  const [form] = Form.useForm();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Full Name" name="fullname" rules={[rule]}>
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item label="Birth Date" name="birthdate" rules={[rule]}>
        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[rule]}>
        <Input type="email" placeholder="john.doe@example.com" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[rule]}>
        <Input.Password placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
