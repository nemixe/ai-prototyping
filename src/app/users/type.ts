import { TResponseData, TResponsePaginate } from "@/commons/types/response";

export type TUserItem = {
  id: string;
  fullname: string;
  birthdate: string;
  email: string;
  password: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type TUserCreateRequest = Omit<TUserItem, "id" | "created_at" | "updated_at">;

export type TUserUpdateRequest = Omit<TUserItem, "created_at" | "updated_at">;

export type TUserGetRequest = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TUserListResponse = TResponsePaginate<TUserItem>;

export type TUserDetailResponse = TResponseData<TUserItem>;
