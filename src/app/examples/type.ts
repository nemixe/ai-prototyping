import { TResponseData, TResponsePaginate } from "@/commons/types/response";

export type TPermissionItem = {
  id: string;
  name: string;
  key: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type TRoleItem = {
  id: string;
  name: string;
  key: string;
  permissions: Array<TPermissionItem>;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type TRoleCreateRequest = Omit<
  TRoleItem,
  "id" | "created_at" | "updated_at" | "permissions"
>;

export type TRoleUpdateRequest = Omit<TRoleItem, "created_at" | "updated_at" | "permissions">;

export type TRoleGetRequest = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TRoleListResponse = TResponsePaginate<TRoleItem>;

export type TRoleDetailResponse = TResponseData<TRoleItem>;
