import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TErrorResponse } from "@/commons/types/error";
import { TUserDetailResponse } from "@/api/users/type";
import { getDetailUser } from "@/api/users/api";

export const useGetDetailUser = (
  id: string,
): UseQueryResult<TUserDetailResponse, TErrorResponse> => {
  return useQuery({
    queryKey: ["detail-user"],
    queryFn: async () => await getDetailUser(id),
  });
};
