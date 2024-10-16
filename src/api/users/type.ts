import { TDetailResponse, TListResponse } from "@/common/types/response";

export type TUserItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserCreateRequest = Omit<
  TUserItem,
  "id" | "status" | "created_at" | "updated_at"
>;

export type TUserUpdateRequest = Omit<
  TUserItem,
  "status" | "created_at" | "updated_at"
>;

export type TUserListResponse = TListResponse<TUserItem[]>;

export type TUserDetailResponse = TDetailResponse<TUserItem>;
