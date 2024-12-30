import { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
};
