import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "@/components";
import { getValue } from "@/utils";
import { TOKEN } from "@/const";
import ApiService from "@/services/ApiService";

Vue.config.productionTip = false;
Vue.use(VueMeta);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  async beforeCreate() {
    const token = getValue(TOKEN);
    this.$store.commit("auth/SET_TOKEN", token);

    await ApiService.initClient(async (error) => {
      if (error.response && error.response.status === 401 && getValue(TOKEN)) {
        await this.$store.dispatch("auth/logout");
      }
      if (this.$route.name !== "Login") {
        this.$router.push({ name: "Login" });
      }
    });

    if (token) {
      ApiService.setToken(token);
      await this.$store.dispatch("auth/getUser");
    }
  },
}).$mount("#app");
