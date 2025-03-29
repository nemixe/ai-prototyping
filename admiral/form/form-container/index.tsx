import { Form, FormProps } from "antd";
import React from "react";

type FormContainerProps = Omit<FormProps, "children"> & {
  children: React.ReactNode;
  type?: "default";
};

/**
 * @deprecated
 * please use Form by ant design instead
 */
const FormContainer: React.FC<FormContainerProps> = ({
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
          wrapperCol: { span: 16 },
        };
    }
  };

  return (
    <Form
      labelCol={formCol().labelCol}
      wrapperCol={formCol().wrapperCol}
      style={{ maxWidth: "100%", width: "700px", margin: "auto", ...style }}
      {...rest}
    >
      {children}
    </Form>
  );
};

export default FormContainer;
