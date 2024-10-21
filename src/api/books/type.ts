import { TListResponse } from "@/common/types/response";

export type TBookItem = {
  id: string;
  title: string;
  year: number;
};

export type TBookListResponse = TListResponse<TBookItem[]>;
