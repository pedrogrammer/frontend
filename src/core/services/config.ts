import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:1337",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

let axiosInstance: AxiosInstance | undefined;

export default function getAxiosInstance(): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = axios.create(baseConfig);
  }

  axiosInstance.interceptors.request.use(
    async (requestConfig) => requestConfig,
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
