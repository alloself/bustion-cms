import vuetify from '@/shared/plugins/vuetify'
import pinia from '@/app/store'
import router from '@/app/router'
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
