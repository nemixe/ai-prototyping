import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query-client";

export const ReactQueryProvider = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
