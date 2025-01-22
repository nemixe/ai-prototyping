import { AxiosRequestConfig } from "axios";
import { SessionCookies } from "../cookies";
import { env } from "../env";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${SessionCookies.get()?.access_token}`,
  },
};
