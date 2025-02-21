import { TResponsePaginate } from "@/commons/types/response";

export type TBookItem = {
  id: string;
  title: string;
  year: number;
  publish_date: string;
};

export type TBookResponse = TResponsePaginate<TBookItem>;
