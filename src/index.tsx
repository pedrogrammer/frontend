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
import { ConfigProvider } from "antd";

import { toast } from "react-toastify";

import { I18nextProvider } from "react-i18next";
import i18n from "./core/localize";

// Handle global errors
const handleGlobalError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      // No response from server (likely network error or API is down)
      toast.error("Network issue: Check your internet connection.");
    } else if (error.response.status >= 500) {
      // Server-side error
      toast.error("Server is experiencing issues. Try again later.");
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

const antDTheme = {
  token: {
    colorPrimary: lightTheme.primary,
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={antDTheme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ConfigProvider>
    </ThemeProvider>
  </QueryClientProvider>,
);
