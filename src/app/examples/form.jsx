import { Button, Col, Form, Input, Row, Select } from "antd";
import { Section } from "admiral";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";
import { Flex } from "antd";
import { useNavigate } from "react-router";

export const FormRole = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="General Information">
          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/roles")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
