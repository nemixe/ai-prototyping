import { getRoles } from "@/api/role";
import { TRoleGetRequest } from "@/api/role/type";
import { useQuery } from "@/app/_hooks/request/use-query";

export const queryKey = "get-roles";

export const useGetRoles = (params: TRoleGetRequest) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => getRoles(params),
  });
};
