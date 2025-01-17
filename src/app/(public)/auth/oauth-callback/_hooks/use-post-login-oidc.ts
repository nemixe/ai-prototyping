import { postLoginOidc } from "@/api/auth/api";
import { TLoginOidcParam } from "@/api/auth/type";
import {
  AccessTokenCookies,
  RefreshTokenCookies,
  UserCookies,
} from "@/libs/cookies";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const usePostLoginOidc = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-login-oidc"],
    mutationFn: (payload: TLoginOidcParam) => postLoginOidc(payload),
    onSuccess: (res) => {
      AccessTokenCookies.set(res.data.access_token);
      RefreshTokenCookies.set(res.data.refresh_token);
      UserCookies.set(res.data.user);
      navigate("/dashboard");
    },
  });
};
