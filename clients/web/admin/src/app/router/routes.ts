import Company from '@/app/layouts/Company.vue'
import { generateModulesRoutes } from '@/entities/module'
import { RouteRecordRaw } from 'vue-router'


export const routes = [
  ...generateModulesRoutes(import.meta.env.VITE_APP_MODULES.split(",")),
  {
    path: "/",
    redirect: import.meta.env.VITE_APP_DEFAULT_ALIAS
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
    meta: {
      layout: Company
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    redirect: "/",
  },
] as RouteRecordRaw[]
