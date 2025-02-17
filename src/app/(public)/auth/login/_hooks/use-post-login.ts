import { postLogin } from "@/api/auth/api";
import { TLoginParam, TLoginResponse } from "@/api/auth/type";
import { SessionUser } from "@/libs/localstorage";
import { SessionToken } from "@/libs/cookies";
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
      SessionUser.set(res.data);
      SessionToken.set(res.data);
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
