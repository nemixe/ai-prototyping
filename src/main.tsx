import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./libs/react-query/react-query-provider";
import { router } from "./app/app-router";
import { AppBoundary } from "./app/_components/ui/app-boundary";
import { AppError } from "./app/_components/ui/app-error";
import { AppLoading } from "./app/_components/ui/app-loading";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppBoundary error={<AppError />} loading={<AppLoading />}>
        <RouterProvider router={router} />
      </AppBoundary>
    </ReactQueryProvider>
  </StrictMode>,
);
