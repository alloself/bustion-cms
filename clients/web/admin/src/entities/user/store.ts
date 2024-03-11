import { client } from "@/shared/api/axios";
import { IUser } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref<IUser | null>(null)

    const getUser = async () => {
        try {
            const { data } = await client.get("/api/admin/me");
            user.value = data;
        } catch (e: any) {
            return e;
        }
    }

    const logout = async () => {
        try {
            user.value = null
            await client.post("/logout")
        }
        catch (e) {
            console.log(e)
        }
    }

    const login = async (data: Record<string, any> | undefined) => {
        try {
            await client.post("/login", data);
            await getUser();
            return user.value;
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    return {
        user,
        getUser,
        logout,
        login
    }
});