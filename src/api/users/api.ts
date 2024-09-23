import { api } from "@/libs/axios/api";
import { TUserCreateRequest, TUserResponse } from "./type";
import { ENDPOINT } from "@/common/constants/endpoint";
import { urlParser } from "@/utils/helper";

export const postCreateUser = async (
  params: TUserCreateRequest,
): Promise<TUserResponse> => {
  const { data } = await api({
    method: "POST",
    url: ENDPOINT.USERS.CREATE,
    data: params,
  });
  return data;
};

export const getDetailUser = async (param: string): Promise<TUserResponse> => {
  const { data } = await api({
    method: "GET",
    url: urlParser(ENDPOINT.USERS.DETAIL, {
      id: param,
    }),
  });
  return data;
};
