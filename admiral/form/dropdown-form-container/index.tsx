import { Form, FormProps } from "antd";
import React from "react";

type DropdownFormContainerProps = Omit<FormProps, "children"> & {
  children: React.ReactNode;
  type?: "default";
};

const DropdownFormContainer: React.FC<DropdownFormContainerProps> = ({
  children,
  type = "default",
  style,
  ...rest
}) => {
  const formCol = () => {
    switch (type) {
      case "default":
        return {
          labelCol: { span: 8 },
          wrapperCol: { span: 24 },
        };
    }
  };

  return (
    <Form
      labelCol={formCol().labelCol}
      wrapperCol={formCol().wrapperCol}
      style={{ maxWidth: "100%", margin: "auto", ...style }}
      {...rest}
    >
      {children}
    </Form>
  );
};

export default DropdownFormContainer;
