import { TResponseError } from "@/commons/types/response";
import { formErrorHandling } from "@/utils/form";
import { FormInstance } from "antd";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  error?: TResponseError | null
) => {
  useEffect(() => {
    if (error) formErrorHandling(form, error);
  }, [error, form]);
};
