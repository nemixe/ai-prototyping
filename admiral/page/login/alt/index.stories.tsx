import { Meta, StoryFn } from "@storybook/react";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import {
  Flex,
  Typography,
  Space,
  Form,
  Input,
  Checkbox,
  Button,
  Row,
  Col,
} from "antd";
import { ThemeProvider } from "../../../context/theme";
import { CompanyLogo } from "../../../icon";

const { Title, Text } = Typography;

export default {
  title: "Example Page/LoginPage/Alternative",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Login Page is a page for user to login. this is alternative design you can modify from the example code",
      },
    },
  },
} as Meta;

const Template: StoryFn = () => {
  return (
    <ThemeProvider>
      <Row
        style={{
          backgroundColor: "#F5F5F5",
          minHeight: "100vh",
        }}
      >
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Flex
            style={{
              maxWidth: "459px",
              height: "357px",

              flexDirection: "column",
            }}
          >
            <Space
              align="center"
              size="large"
              style={{ justifyContent: "center" }}
            >
              <CompanyLogo src="https://static-00.iconduck.com/assets.00/ant-design-icon-2048x2046-dl3neb73.png" />
              <Title>Ant Design</Title>
            </Space>
            <Text
              style={{ color: "#000000", opacity: ".5", textAlign: "center" }}
            >
              Ant Design is the most influential web design specification in
              Xihu district
            </Text>
            <Form style={{ width: "100%", marginTop: "32px" }}>
              <Form.Item>
                <Input placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item>
                  <Checkbox style={{ marginRight: "8px" }} />
                  <Text>Remember me</Text>
                </Form.Item>

                <a href="#">
                  <Text>Forgot password</Text>
                </a>
              </Flex>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button htmlType="submit" type="primary" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </Col>
        <Col span={12} style={{ backgroundColor: "blue" }}>
          <img
            src="/asset/gambar.jpeg"
            alt="gambar"
            style={{ objectFit: "cover" }}
            width={"100%"}
            height={"100%"}
          />
        </Col>
      </Row>
    </ThemeProvider>
  );
};
export const Alt = Template.bind({});

Alt.args = {};
