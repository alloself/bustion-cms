import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const guards = [
  {
    name: "authGuard",
    handler: (
      to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      next();
    },
  },
  {
    name: "alreadyAuthGuard",
    handler: (
      to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      next();
    },
  },
];
