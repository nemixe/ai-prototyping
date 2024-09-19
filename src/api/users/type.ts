import { TResponse } from "@/common/types/response";

export type TUserItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export type TUserResponse = TResponse<TUserItem[]>;

export type TUserCreateRequest = {
  name: string;
  email: string;
  phone: string;
  address: string;
};
