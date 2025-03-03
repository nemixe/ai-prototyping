import { useEffect } from "react";

export const useFormErrorHandling = (error, onError) => {
  useEffect(() => {
    error?.errors?.forEach((value) => onError?.(value));
  }, [error]);
};
