import { Button, Col, Form, Input, Row, InputNumber, Table } from "antd";
import { Section } from "admiral";
import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import { Modal } from "antd";
import { useState } from "react";

export const FormWithMultiSection = ({ formProps, error, loading, isEdit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    modalForm.resetFields();
  };

  const handleSubmitModal = async () => {
    try {
      const values = await modalForm.validateFields();
      setData((prevData) => [...prevData, values]);
      handleCloseModal();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section
          style={{
            marginBottom: "12px",
          }}
          title="Book Information"
        >
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
        <Section title="Book Information with Table">
          <Row
            style={{
              marginBottom: "12px",
              justifyContent: "end",
              gap: "12px",
            }}
          >
            <Button onClick={handleOpenModal}>Add New</Button>
          </Row>
          <Table
            dataSource={data}
            columns={[
              {
                title: "Book Title",
                dataIndex: "title",
                key: "title",
              },
              {
                title: "Book Year",
                dataIndex: "year",
                key: "year",
              },
              {
                title: "ISBN",
                dataIndex: "isbn",
                key: "isbn",
              },
            ]}
          />
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

      <Modal
        open={openModal}
        onOk={handleSubmitModal}
        onCancel={handleCloseModal}
        title="Add New Book"
      >
        <Form form={modalForm} layout="vertical">
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
        </Form>
      </Modal>
    </Form>
  );
};
