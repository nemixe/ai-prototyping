import { useQuery } from "@tanstack/react-query";
import { getBooks } from "./api";

export const useGetBooks = (params: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getBooks(params),
  });
};
