import { api } from "@/libs/axios/api";
import {
  TUserCreateRequest,
  TUserDetailResponse,
  TUserListResponse,
} from "./type";
import { ENDPOINT } from "@/commons/constants/endpoint";
import { urlParser } from "@/utils/url-parser";
import { TMetaRequest } from "@/commons/types/meta";

export const postCreateUser = async (
  params: TUserCreateRequest,
): Promise<TUserListResponse> => {
  const { data } = await api<TUserListResponse>({
    method: "POST",
    url: ENDPOINT.USERS.CREATE,
    data: params,
  });
  return data;
};

export const getDetailUser = async (
  param: string,
): Promise<TUserDetailResponse> => {
  const { data } = await api({
    method: "GET",
    url: urlParser(ENDPOINT.USERS.DETAIL, {
      id: param,
    }),
  });
  return data;
};

export const getListUser = async (
  params: TMetaRequest,
): Promise<TUserListResponse> => {
  const { data } = await api<TUserListResponse>({
    method: "GET",
    params,
    url: ENDPOINT.USERS.LIST,
  });
  return data;
};

export const putUpdateUser = async (
  params: TUserCreateRequest,
): Promise<string> => {
  const { data } = await api<string>({
    method: "PUT",
    url: ENDPOINT.USERS.UPDATE,
    data: params,
  });
  return data;
};

export const deleteDeleteUser = async (param: string): Promise<string> => {
  const { data } = await api<string>({
    method: "DELETE",
    url: urlParser(ENDPOINT.USERS.DELETE, {
      id: param,
    }),
  });
  return data;
};
