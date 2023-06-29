import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";
import axios from "axios";

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error
  }
);

client.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const errorMessage = error?.response?.data?.message || error.message;
    if (error.response?.status === 401 || error.code === "ERR_NETWORK" || error.response?.status === 410) {
      const userStore = useUserStore();
      await userStore.logout();
    } else {
      const notificationStore = useNotificationStore();

      notificationStore.pushNotification({
        content: errorMessage,
        color: "error",
      });
    }


    return Promise.reject(error);
  }
);
