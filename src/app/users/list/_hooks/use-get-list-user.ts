import { TErrorResponse } from "@/common/types/error";
import { getListUser } from "@/api/users/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TUserListResponse } from "@/api/users/type";
import { QUERY_KEY } from "@/common/constants/query-key";
import { TMetaRequest } from "@/common/types/meta";

export const useGetListUser = (
  params: TMetaRequest
): UseQueryResult<TUserListResponse, TErrorResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS.LIST],
    queryFn: async () => await getListUser(params),
  });
};
