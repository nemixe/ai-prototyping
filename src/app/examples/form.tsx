import type { FC, ReactElement } from "react";
import { Button, Form, Input, Select } from "antd";
import { FormProps } from "antd/lib";
import { TResponseError } from "@/commons/types/response";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

type TProps = {
  formProps: FormProps;
  loading: boolean;
  error: TResponseError | null;
};

export const FormRole: FC<TProps> = ({ formProps, error, loading }): ReactElement => {
  const [form] = Form.useForm();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Name is required",
          },
        ]}
      >
        <Input placeholder="Admin HC" />
      </Form.Item>
      <Form.Item
        label="Key"
        name="roleKey"
        rules={[
          {
            required: true,
            message: "Key is required",
          },
        ]}
      >
        <Input placeholder="admin-hc" />
      </Form.Item>
      <Form.Item
        label="Permissions"
        name="permissions_ids"
        rules={[
          {
            required: true,
            message: "Permissions are required",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select Permissions"
          options={[
            {
              label: "Read Users",
              value: "read-users",
            },
          ]}
          loading={false}
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
