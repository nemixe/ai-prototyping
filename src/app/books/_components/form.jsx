import { Button, Col, Form, Input, Row, InputNumber } from "antd";
import { Section } from "admiral";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";
import { Flex } from "antd";
import { useNavigate } from "react-router";

export const FormBook = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Book Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="ISBN"
                name="isbn"
                rules={[
                  {
                    required: true,
                    message: "ISBN is required",
                  },
                ]}
              >
                <Input placeholder="978-3-16-148410-0" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Title is required",
                  },
                ]}
              >
                <Input placeholder="The Great Gatsby" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Year"
                name="year"
                rules={[
                  {
                    required: true,
                    message: "Year is required",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="2023"
                  min={1000}
                  max={new Date().getFullYear()}
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/books")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
