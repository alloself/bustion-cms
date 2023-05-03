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
    if (config.url?.includes("api")) {
      config.headers.Accept = "multipart/form-data";
    } else {
      config.headers.Accept = "application/json";
    }
    console.log(config)
    return config;
  },
  (error) => {}
);

client.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const errorMessage = error?.response?.data?.message || error.message;
    if (error.response?.status === 401 || error.code === "ERR_NETWORK") {
      const userStore = useUserStore();
      await userStore.logout();
    } else {
      const notificationStore = useNotificationStore();

      notificationStore.pushNotification({
        content: errorMessage,
        color: "error",
      });
    }
    if (error.response?.status === 419) {
      client.get("/sanctum/csrf-cookie");
    }

    return Promise.reject(error);
  }
);
