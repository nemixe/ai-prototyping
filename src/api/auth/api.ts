import { ENDPOINT } from "@/commons/constants/endpoint";
import { api } from "@/libs/axios/api";
import { TLoginParam, TLoginResponse } from "./type";

export const postLogin = async (
  payload: TLoginParam,
): Promise<TLoginResponse> => {
  return {
    data: {
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  };
  const { data } = await api({
    url: ENDPOINT.AUTH.LOGIN,
    method: "POST",
    data: payload,
  });
  return data;
};
