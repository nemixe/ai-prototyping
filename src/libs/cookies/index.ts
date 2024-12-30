import Cookies from "js-cookie";

export const UserCookies = {
  set: (val: unknown) => Cookies.set("users", JSON.stringify(val)),
  get: () => JSON.parse(Cookies.get("users") ?? "{}"),
  remove: () => Cookies.remove("users"),
};

export const AccessTokenCookies = {
  set: (val: string) => Cookies.set("access_token", val),
  get: (): string => JSON.parse(String(Cookies.get("access_token"))),
  remove: () => Cookies.remove("access_token"),
};
