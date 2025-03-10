import { Button, Col, Form, Input, Row, DatePicker } from "antd";
import { Section } from "admiral";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

export const FormMovie = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }])
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Movie Information">
          <Row gutter={16}>
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
                <Input placeholder="Enter movie title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Director"
                name="director"
                rules={[
                  {
                    required: true,
                    message: "Director is required",
                  },
                ]}
              >
                <Input placeholder="Enter director name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Release Date"
                name="releaseDate"
                rules={[
                  {
                    required: true,
                    message: "Release date is required",
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="Select release date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Total Copies"
                name="totalCopies"
                rules={[
                  {
                    required: true,
                    message: "Total copies is required",
                  },
                  {
                    type: 'number',
                    min: 0,
                    message: "Total copies must be a non-negative number",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter total copies" />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/movies")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
