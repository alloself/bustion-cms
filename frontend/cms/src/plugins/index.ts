import { router } from '@/router';
import { createPinia } from "pinia";
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import type { App } from "vue";
import { setupLocalForage } from './localforge';

export function registerPlugins(app: App) {
  loadFonts();
  setupLocalForage()
  app.use(router)
  app.use(createPinia());
  app.use(vuetify);
}
