import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TErrorResponse } from "@/common/types/error";
import { TUserResponse } from "@/api/users/type";
import { getDetailUser } from "@/api/users/api";

export const useGetDetailUser = (
  id: string,
): UseQueryResult<TUserResponse, TErrorResponse> => {
  return useQuery({
    queryKey: ["detail-user"],
    queryFn: async () => await getDetailUser(id),
  });
};
