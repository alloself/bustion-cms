import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/app/router/routes";
import { guards } from "@/app/router/guards";

const router = createRouter({
  history: createWebHistory('/admin'),
  routes,
});

guards.forEach(({ handler }) => router.beforeEach(handler));

export default router;
