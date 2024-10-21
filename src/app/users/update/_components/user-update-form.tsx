import { Fragment, type FC, type ReactElement } from "react";
import { Button, Form, Input } from "antd";
import { TUserUpdateRequest } from "@/api/users/type";
import { Header } from "@/components/ui/header";
import { BREADCRUMB_ITEMS } from "@/common/constants/breadcrumb";

export const UserUpdateForm: FC = (): ReactElement => {
  const onFinish = (value: TUserUpdateRequest) => {
    console.log(value);
  };

  return (
    <Fragment>
      <Header
        breadcrumb={BREADCRUMB_ITEMS.USERS.UPDATE}
        title={"User Update"}
      />
      <Form name="user_update" layout="vertical" onFinish={onFinish}>
        <Form.Item<TUserUpdateRequest> name="name" label="Full Name">
          <Input placeholder="Input Fullname" />
        </Form.Item>
        <Form.Item<TUserUpdateRequest> name="email" label="Email">
          <Input placeholder="Input Email" />
        </Form.Item>
        <Form.Item<TUserUpdateRequest> name="phone" label="Phone Number">
          <Input placeholder="Input Phone Number" type="number" />
        </Form.Item>
        <Form.Item<TUserUpdateRequest> name="address" label="Address">
          <Input.TextArea placeholder="Input Address" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};
