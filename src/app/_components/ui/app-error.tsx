import type { FC, ReactElement } from "react";
import { useRouteError } from "react-router-dom";

export const AppError: FC = (): ReactElement => {
  const error = useRouteError();
  console.log(error);
  return <div>Error...</div>;
};
