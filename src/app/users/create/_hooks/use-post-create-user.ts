import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TErrorResponse } from "@/common/types/error";
import { TUserCreateRequest, TUserListResponse } from "@/api/users/type";
import { postCreateUser } from "@/api/users/api";
import { QUERY_KEY } from "@/common/constants/query-key";

export const usePostCreateUser = (): UseMutationResult<
  TUserListResponse,
  TErrorResponse,
  TUserCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: [QUERY_KEY.USERS.LIST],
    mutationFn: async (params) => await postCreateUser(params),
  });
};
