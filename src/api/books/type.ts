import { TListResponse } from "@/commons/types/response";

export type TBookItem = {
  id: string;
  title: string;
  year: number;
};

export type TBookListResponse = TListResponse<TBookItem[]>;
