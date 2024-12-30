import { LoaderFunctionArgs } from "react-router-dom";

export const middleware = async (p: LoaderFunctionArgs) => {
  console.log(p);
  return {
    users: {},
  };
};
