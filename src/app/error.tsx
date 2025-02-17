import { Button, Result } from "antd";
import type { FC, ReactElement } from "react";
import { useRouteError } from "react-router";

const AppError: FC = (): ReactElement => {
  const error = useRouteError();
  const err = error as { message: string };
  return (
    <Result
      status="500"
      title="500"
      subTitle={err?.message}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default AppError;
