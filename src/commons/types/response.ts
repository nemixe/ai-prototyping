import { TMetaResponse } from "./meta";

export type TListResponse<T> = {
  data: T;
  meta: TMetaResponse;
};

export type TDetailResponse<T> = {
  data: T;
};
