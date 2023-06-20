import { router } from "@/router";
import { client } from "@/plugins/axios";
import { defineStore } from "pinia";

export interface IUser {
  name: string;
  email: string;
}

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null as IUser | null,
    };
  },
  actions: {
    async getUser() {
      try {
        const { data } = await client.get("/api/cms/user");
        this.user = data;
      } catch (e: any) {
        return e;
      }
    },
    async logout() {
      router.push({ name: "Login" });
      if (this.user) {
        client.post("/logout").then(() => (this.user = null));
      }
    },
    async login(user: Record<string, any> | undefined) {
      try {
        await client.post("/login", user);
        await this.getUser();
      } catch (e: any) {
        return Promise.reject(e);
      }
    },
  },
});
