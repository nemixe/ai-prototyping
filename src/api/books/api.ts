import { ENDPOINT } from "@/common/constants/endpoint";
import { api } from "@/libs/axios/api";
import { TBookListResponse } from "./type";
import { TMetaRequest } from "@/common/types/meta";

export const getListBook = async (
  params: TMetaRequest
): Promise<TBookListResponse> => {
  const { data } = await api<TBookListResponse>({
    url: ENDPOINT.BOOKS.LIST,
    params,
    method: "GET",
  });
  return data;
};
