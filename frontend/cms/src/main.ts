import { router } from "@/router";
import { client } from "@/plugins/axios";
import App from "@/App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import { useUserStore } from "@/stores/user";
import { setupModules } from "@/plugins/modules";
import "@/styles/index.scss";

const app = createApp(App);

registerPlugins(app);

const userStore = useUserStore();

router.isReady().then(() => {
  client.get("/sanctum/csrf-cookie").then(async () => {
    await setupModules(import.meta.env.VITE_APP_MODULES.split(","));
    try {
      await userStore.getUser();
    } catch (e) {
      console.log(e);
    } finally {
      app.mount("#app");
    }
  });
});
