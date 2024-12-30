import { ENDPOINT } from "@/commons/constants/endpoint";
import { api } from "@/libs/axios/api";
import { TLoginParam, TLoginResponse } from "./type";

export const PostLogin = async (
  payload: TLoginParam,
): Promise<TLoginResponse> => {
  const { data } = await api({
    url: ENDPOINT.AUTH.LOGIN,
    method: "POST",
    data: payload,
  });
  return data;
};
