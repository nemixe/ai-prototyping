import type { FC, ReactElement } from "react";
import { useRouteError } from "react-router";

const AppError: FC = (): ReactElement => {
  const error = useRouteError();
  console.log(error);
  return <div>Error...</div>;
};

export default AppError;
