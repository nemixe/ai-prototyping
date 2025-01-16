import { postLogin } from "@/api/auth/api";
import { TLoginParam, TLoginResponse } from "@/api/auth/type";
import { PERMISSIONS } from "@/commons/constants/permissions";
import {
  AccessTokenCookies,
  RefreshTokenCookies,
  UserCookies,
} from "@/libs/cookies";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  unknown,
  TLoginParam,
  unknown
> => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: (payload) => postLogin(payload),
    onSuccess: (res) => {
      AccessTokenCookies.set(res.data.access_token);
      RefreshTokenCookies.set(res.data.refresh_token);

      UserCookies.set({
        id: 1,
        name: "Admin",
        email: "admin@mail.com",
        phone: "0891212314",
        address: "",
        status: "Active",
        createdAt: new Date("2021-08-01T00:00:00.000Z"),
        updatedAt: new Date("2021-08-01T00:00:00.000Z"),
        role: {
          id: "1",
          name: "Admin",
          permissions: [
            {
              id: "1",
              name: PERMISSIONS.DASHBOARD.READ_DASHBOARD,
            },
            {
              id: "2",
              name: PERMISSIONS.USERS.READ_USERS,
            },
          ],
        },
      });
      navigate(0);
    },
  });
};
