import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TErrorResponse } from "@/commons/types/error";
import { TUserUpdateRequest } from "@/api/users/type";
import { putUpdateUser } from "@/api/users/api";
import { QUERY_KEY } from "@/commons/constants/query-key";

export const usePutUpdateUser = (): UseMutationResult<
  string,
  TErrorResponse,
  TUserUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: [QUERY_KEY.USERS.UPDATE],
    mutationFn: async (params) => await putUpdateUser(params),
  });
};
