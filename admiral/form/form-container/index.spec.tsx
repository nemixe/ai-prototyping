import { render, screen } from "@testing-library/react";
import FormContainer from "./index";
import { describe, it, expect } from "vitest";
import { Form, Input } from "antd";

describe("Testing FormContainer", () => {
  it("Render FormContainer", async () => {
    render(
      <FormContainer
        type="default"
        children={[
          <Form.Item label="Email" name="email" required>
            <Input type="email" placeholder="Input" />
          </Form.Item>,
          <Form.Item label="Password" name="password" required>
            <Input.Password />
          </Form.Item>,
        ]}
      />,
    );
    expect(screen.getByText("Email")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
  });
});
