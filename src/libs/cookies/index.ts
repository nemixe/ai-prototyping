import { TUserItem } from "@/api/user/type";
import Cookies from "js-cookie";

export const SessionCookies = {
  set: (val: {
    access_token: string;
    refresh_token: string;
    user: TUserItem;
  }) => Cookies.set("users", JSON.stringify(val)),
  get: ():
    | {
        access_token: string;
        refresh_token: string;
        user: TUserItem;
      }
    | undefined => {
    const users = Cookies.get("users");
    if (!users) return undefined;
    return JSON.parse(users);
  },
  remove: () => Cookies.remove("users"),
};
