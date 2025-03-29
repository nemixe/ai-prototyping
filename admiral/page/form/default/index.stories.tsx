import type { Meta, StoryFn } from "@storybook/react";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  type FormItemProps,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import InputCurrency from "../../../input/input-currency";
import Uploader from "../../../uploader";
import { ThemeProvider } from "../../../context/theme";
import MainLayout from "../../../layout/main-layout";
import FormContainer from "../../../form/form-container";
import { Page } from "../../../layout";
import TextEditor from "../../../input/text-editor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParametersOrUndefined<T> = T extends (...args: infer P) => any ? P : never;

const normFile = (
  e?: ParametersOrUndefined<FormItemProps["getValueFromEvent"]>,
) => {
  if (Array.isArray(e)) {
    return e;
  }
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{ width: 70 }}
      options={[
        {
          label: "62",
          value: "+62",
        },
        {
          label: "87",
          value: "+87",
        },
      ]}
    />
  </Form.Item>
);

export default {
  title: "Example Page/FormPage/Default",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form Page is a page for displaying form. You can use some of the components from antd.",
      },
    },
  },
} as Meta;

const Template: StoryFn = () => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    return;
  };

  return (
    <ThemeProvider>
      <MainLayout
        header={{
          brandLogo: <div>Your brand logo goes here</div>,
        }}
        sidebar={{
          defaultOpenKeys: ["sub1"],
          defaultSelectedKeys: ["1"],
          menu: [
            {
              key: "1",
              label: "Option 1",
            },
            {
              key: "2",
              label: "Option 2",
            },
          ],
          width: 232,
        }}
      >
        <Page
          breadcrumbs={[
            {
              label: "User List",
              path: "/users",
            },
            {
              label: "Add New",
              path: "/users/new",
            },
          ]}
          title="Add New User"
          topActions={<Button icon={<PlusOutlined />}>Create</Button>}
        >
          <Row
            style={{
              backgroundColor: "white",
              paddingTop: "40px",
              paddingBottom: "40px",
              borderRadius: "8px",
            }}
          >
            <FormContainer
              form={form}
              onFinish={onFinish}
              initialValues={{
                prefix: "62",
                quantity: 3,
                status: true,
                suffix: "USD",
                rate: 4,
                aggreement: true,
                checkboxItem: "A",
              }}
            >
              <Form.Item label="Email" name="email" required>
                <Input type="email" placeholder="Input" />
              </Form.Item>

              <Form.Item label="Password" name="password" required>
                <Input.Password />
              </Form.Item>

              <Form.Item name="phone" label="Phone Number" required>
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Description" name="description" required>
                <TextArea placeholder="Textarea" />
              </Form.Item>

              <Form.Item name="gender" label="Gender" required>
                <Select
                  placeholder="Select"
                  options={[
                    {
                      label: "Men",
                      value: "Men",
                    },
                    {
                      label: "Woman",
                      value: "Woman",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item label="DatePicker" name="date" required>
                <DatePicker />
              </Form.Item>

              <Form.Item label="Time" name="time" required>
                <TimePicker />
              </Form.Item>

              <Form.Item label="Quantity" name="quantity" required>
                <InputNumber />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status Active"
                tooltip="Check status"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item name="button" label="Button" required>
                <Button>Button</Button>
              </Form.Item>

              <Form.Item label="Price" name="price" required>
                <InputCurrency
                  style={{ width: "100%" }}
                  locale="id"
                  prefix="IDR"
                  value={"1000"}
                  onChange={() => {
                    console.log("Value:", "1000");
                  }}
                />
              </Form.Item>

              <Form.Item name="slider" label="Slider" required>
                <Slider
                  marks={{
                    0: "0",
                    25: "100",
                    50: "200",
                    75: "300",
                    100: "400",
                  }}
                />
              </Form.Item>

              <Form.Item name="rate" label="Rate" required>
                <Rate />
              </Form.Item>

              <Form.Item label="Dragger" tooltip="Upload file" required>
                <Form.Item
                  name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Uploader
                    name="files"
                    action="/upload.do"
                    listType="picture"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                tooltip="Choose at least one"
                required
              >
                <Radio.Group
                  options={[
                    {
                      value: "a",
                      label: "Item 1",
                    },
                    {
                      value: "b",
                      label: "Item 2",
                    },
                    {
                      value: "c",
                      label: "Item 3",
                    },
                    {
                      value: "d",
                      label: "Item 4",
                    },
                  ]}
                  optionType="button"
                  buttonStyle="outline"
                />
              </Form.Item>

              <Form.Item name="item" label="Item" required>
                <Radio.Group
                  options={[
                    {
                      value: "a",
                      label: "Item 1",
                    },
                    {
                      value: "b",
                      label: "Item 2",
                    },
                    {
                      value: "c",
                      label: "Item 3",
                    },
                  ]}
                ></Radio.Group>
              </Form.Item>

              <Form.Item
                name="checkboxItem"
                label="Item"
                tooltip="Choose at least one"
                required
              >
                <Checkbox.Group
                  options={[
                    {
                      value: "A",
                      label: "Checkbox",
                    },
                    {
                      value: "B",
                      label: "Checkbox",
                    },
                    {
                      value: "C",
                      label: "Checkbox",
                    },
                  ]}
                />
              </Form.Item>

              <Form.List name="names">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field) => (
                      <Form.Item
                        label={"Fields"}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="passenger name"
                            style={{ width: "60%" }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{ marginLeft: 6 }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                      }}
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                }}
              >
                <Checkbox>I have read the agreement</Checkbox>
              </Form.Item>
              <Form.Item name="textRich" label="Text Rich Editor" required>
                <TextEditor />
              </Form.Item>
              <Flex gap={16} justify="end">
                <Button>Discard</Button>
                <Button type="primary" disabled>
                  Submit Form
                </Button>
              </Flex>
            </FormContainer>
          </Row>
        </Page>
      </MainLayout>
    </ThemeProvider>
  );
};

export const Default = Template.bind({});

Default.args = {};
