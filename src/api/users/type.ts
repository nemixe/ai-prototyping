import { TDetailResponse, TListResponse } from "@/commons/types/response";

export type TUserItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  role: {
    id: string;
    name: string;
    permissions: Array<{
      id: string;
      name: string;
    }>;
  };
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
