import { Suspense } from "react";

export const AppBoundary = (props) => {
  return (
    <ErrorBoundary fallback={props.error}>
      <Suspense fallback={props.loading}>{props.children}</Suspense>
    </ErrorBoundary>
  );
};
