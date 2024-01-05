import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { RootLayoutProps } from "../types/global";
import ErrorBoundary from "react-native-error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

export const Providers = ({ children }: RootLayoutProps) => {
  const [queryClient] = useState(() => new QueryClient());

  useProtectedRoute();
  return (
    <ErrorBoundary
      onError={(error) => {
        console.log(error.name, error.message);
      }}
    >
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ToastProvider placement="bottom">{children}</ToastProvider>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};
