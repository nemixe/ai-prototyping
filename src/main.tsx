import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./libs/react-query/react-query.provider";
import { router } from "./app/app-router";
import { GlobalError } from "./components/ui/global-error";
import { GlobalLoading } from "./components/ui/global-loading";
import { Boundary } from "./components/ui/boundary";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Boundary error={<GlobalError />} loading={<GlobalLoading />}>
        <RouterProvider router={router} />
      </Boundary>
    </ReactQueryProvider>
  </StrictMode>
);
