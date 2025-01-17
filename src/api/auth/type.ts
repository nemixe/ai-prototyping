import { TUserItem } from "../user/type";

export type TLoginParam = {
  email: string;
  name: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
    user: TUserItem;
  };
};
