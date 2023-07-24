"use client";
import * as React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Notifications from "../components/notifications";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Notifications />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
