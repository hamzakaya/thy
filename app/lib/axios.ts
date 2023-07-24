import { API_URL } from "@/app/config";
import Axios, { AxiosResponse } from "axios";
import { useNotificationStore } from "@/app/store/notifications";

export const axios = Axios.create({
  baseURL: API_URL,
});

function handleResponse<T>(response: AxiosResponse<T>) {
  return response;
}

axios.interceptors.request.use(
  function (config) {
    config.headers!.Accept = "application/json";
    return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(handleResponse, (error) => {
  const message = error.response?.data?.message || error.message;
  useNotificationStore.getState().addNotification({
    type: "warning",
    title: "Error",
    message,
  });

  return Promise.reject(error);
});
