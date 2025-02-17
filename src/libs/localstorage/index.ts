import { TUserItem } from "@/api/user/type";

export const SessionLocalstorage = {
  set: (val: { access_token: string; refresh_token: string; user: TUserItem }) =>
    localStorage.setItem("users", JSON.stringify(val)),

  get: (): { access_token: string; refresh_token: string; user: TUserItem } | undefined => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : undefined;
  },

  remove: () => localStorage.removeItem("users"),
};
