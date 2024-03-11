import '@/app/scss/index.scss'
import App from '@/app/App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/shared/plugins'
import { client } from '@/shared/api/axios';
import { useUserStore } from "@/entities/user/store";
import router from '@/app/router';
import { setupModules } from '@/entities/module';

const app = createApp(App);


registerPlugins(app);

const userStore = useUserStore();



client
  .get("/sanctum/csrf-cookie")
  .then(async () => {
    try {
      await setupModules(import.meta.env.VITE_APP_MODULES.split(","));
      await userStore.getUser();
    } catch (e) {
      console.log(e);
    }
  })
  .then(async () => {
    await router.isReady()
    app.mount("#app");
  });
