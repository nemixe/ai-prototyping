import { useMutation } from "../_hooks/request/use-mutation";
import { useQuery } from "../_hooks/request/use-query";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./api";
import { TUserCreateRequest, TUserGetRequest, TUserUpdateRequest } from "./type";

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
  });
};

export const useGetUsers = (params: TUserGetRequest) => {
  return useQuery({
    queryKey: ["get-users", params],
    queryFn: () => getUsers(params),
  });
};

export const useGetDetailUser = (id: string) => {
  return useQuery({
    queryKey: ["get-detail-user", id],
    queryFn: () => getUser(id),
  });
};

export const usePostCreateUser = () => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: (data: TUserCreateRequest) => createUser(data),
  });
};

export const usePutUpdateUser = (id: string) => {
  return useMutation({
    mutationKey: ["update-user", id],
    mutationFn: (data: TUserUpdateRequest) => updateUser(id, data),
  });
};
