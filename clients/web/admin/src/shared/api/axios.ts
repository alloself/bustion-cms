import { useNotificationStore } from "@/entities/notify/store";
import { useUserStore } from "@/entities/user/store";
import axios from "axios";
import router from '@/app/router';

export const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    withXSRFToken: true,
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
        const userStore = useUserStore();


       
        if (error.response?.status.toString()[0] !== '5' && error.response?.status !== '404') {
            router.push({ name: 'Login' })
        }
        if (error.response?.status.toString() === '401' && userStore.user) {

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
