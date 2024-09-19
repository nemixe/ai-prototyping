import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TErrorResponse } from "@/common/types/error";
import { TUserRequest, TUserResponse } from "@/api/users/type";
import { postCreateUser } from "@/api/users/api";

export const usePostCreateUser = (): UseMutationResult<
  TUserResponse,
  TErrorResponse,
  TUserRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (params) => await postCreateUser(params),
  });
};
