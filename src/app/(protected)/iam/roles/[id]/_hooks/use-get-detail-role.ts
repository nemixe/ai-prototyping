import { getRole } from "@/api/role";
import { useQuery } from "@/app/_hooks/request/use-query";

export const queryKey = "detail-role";

export const useGetDetailRole = (id: string) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getRole(id),
  });
};
