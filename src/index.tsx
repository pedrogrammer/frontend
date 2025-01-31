import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import "./index.css";
import { ThemeProvider } from "react-jss";
import { lightTheme, Theme } from "./core/theme";

// Handle global errors
const handleGlobalError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      // No response from server (likely network error or API is down)
      // ShowErrorNotification("Network issue: Check your internet connection.");
    } else if (error.response.status >= 500) {
      // Server-side error
      // ShowErrorNotification("Server is experiencing issues. Try again later.");
    }
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleGlobalError }),
  mutationCache: new MutationCache({ onError: handleGlobalError }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const theme: Theme = lightTheme;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>,
);
