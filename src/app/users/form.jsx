import { Button, Form, Input, DatePicker } from "antd";

import { useFormErrorHandling } from "../_hooks/form/use-form-error-handling";

export const FormUser = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Full name is required",
          },
        ]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item
        label="Birth Date"
        name="birthdate"
        rules={[
          {
            required: true,
            message: "Birth date is required",
          },
        ]}
      >
        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Email is required",
          },
          {
            type: "email",
            message: "Invalid email address",
          },
        ]}
      >
        <Input type="email" placeholder="john.doe@example.com" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Password is required",
          },
          {
            min: 6,
            message: "Password must be at least 6 characters",
          },
        ]}
      >
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
