import { AxiosRequestConfig } from "axios";
import { SessionLocalstorage } from "../localstorage";
import { env } from "../env";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${SessionLocalstorage.get()?.access_token}`,
  },
};
