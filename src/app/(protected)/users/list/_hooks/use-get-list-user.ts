import { TErrorResponse } from "@/commons/types/error";
import { getListUser } from "@/api/users/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TUserListResponse } from "@/api/users/type";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TMetaRequest } from "@/commons/types/meta";

export const useGetListUser = (
  params: TMetaRequest,
): UseQueryResult<TUserListResponse, TErrorResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS.LIST],
    queryFn: async () => await getListUser(params),
  });
};
