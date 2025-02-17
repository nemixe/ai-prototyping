import { postLogin } from "@/api/auth/api";
import { TLoginParam, TLoginResponse } from "@/api/auth/type";
import { SessionLocalstorage } from "@/libs/localstorage";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { notification } from "antd";
import { useNavigate } from "react-router";

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  unknown,
  TLoginParam,
  unknown
> => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: async (payload) => await postLogin(payload),
    onSuccess: (res) => {
      SessionLocalstorage.set({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        user: res.data.user,
      });
      navigate(0);
    },
    onError: (error) => {
      notification.error({
        message: "Login Failed",
        description: (error as Error).message,
      });
    },
  });
};
