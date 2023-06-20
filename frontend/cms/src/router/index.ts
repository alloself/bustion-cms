import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import { guards } from "@/router/guards";

const router = createRouter({
  history: createWebHistory('/cms'),
  routes,
});

guards.forEach(({ handler }) => router.beforeEach(handler));

export { router };
