import { TUserItem } from "@/api/users/type";
import Cookies from "js-cookie";

export const UserCookies = {
  set: (val: TUserItem) => Cookies.set("users", JSON.stringify(val)),
  get: (): TUserItem => JSON.parse(Cookies.get("users") ?? "{}"),
  remove: () => Cookies.remove("users"),
};

export const AccessTokenCookies = {
  set: (val: string) => Cookies.set("access_token", val),
  get: (): string | undefined => Cookies.get("access_token"),
  remove: () => Cookies.remove("access_token"),
};

export const RefreshTokenCookies = {
  set: (val: string) => Cookies.set("refresh_token", val),
  get: (): string | undefined => Cookies.get("refresh_token"),
  remove: () => Cookies.remove("refresh_token"),
};
