import { TMeta } from "./meta";

export type TResponse<T> = {
  data: T;
  meta: TMeta;
};
