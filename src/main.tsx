import { createRoot } from "react-dom/client";
import { router } from "./app/routes";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { ReactQueryProvider } from "./libs/react-query/react-query-provider";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </StrictMode>,
);
