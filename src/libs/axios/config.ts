import { AxiosRequestConfig } from "axios";
import { SessionCookies } from "../cookies";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${SessionCookies.get()?.access_token}`,
  },
};
