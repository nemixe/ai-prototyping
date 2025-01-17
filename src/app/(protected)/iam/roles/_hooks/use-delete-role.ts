import { deleteRole } from "@/api/role";
import { useMutation } from "@/app/_hooks/request/use-mutation";

export const queryKey = "delete-role";

export const useDeleteRole = () => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: deleteRole,
  });
};
