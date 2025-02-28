import { useMutation } from "../_hooks/request/use-mutation";
import { useQuery } from "../_hooks/request/use-query";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "./api";
import { TRoleCreateRequest, TRoleGetRequest, TRoleUpdateRequest } from "./type";

export const useDeleteRole = () => {
  return useMutation({
    mutationKey: ["delete-role"],
    mutationFn: deleteRole,
  });
};

export const useGetRoles = (params: TRoleGetRequest) => {
  return useQuery({
    queryKey: ["get-roles", params],
    queryFn: () => getRoles(params),
  });
};

export const useGetDetailRole = (id: string) => {
  return useQuery({
    queryKey: ["get-detail-role", id],
    queryFn: () => getRole(id),
  });
};

export const usePostCreateRole = () => {
  return useMutation({
    mutationKey: ["create-roles"],
    mutationFn: (data: TRoleCreateRequest) => createRole(data),
  });
};

export const usePutUpdateRole = (id: string) => {
  return useMutation({
    mutationKey: ["update-role", id],
    mutationFn: (data: TRoleUpdateRequest) => updateRole(id, data),
  });
};
