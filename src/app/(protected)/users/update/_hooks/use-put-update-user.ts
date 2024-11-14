import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TErrorResponse } from "@/common/types/error";
import { TUserUpdateRequest } from "@/api/users/type";
import { putUpdateUser } from "@/api/users/api";

export const usePutCreateUser = (): UseMutationResult<
  string,
  TErrorResponse,
  TUserUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (params) => await putUpdateUser(params),
  });
};
