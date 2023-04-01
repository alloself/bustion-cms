import { capitalize } from "@/utils";

const getModuleRoutes = (key: string) => {
  const rootList = {
    path: `/${key}`,
    meta: {
      module: key,
    },
    name: `${capitalize(key)}List`,
    component: () => import(`@/components/ModuleList.vue`),
  };

  if (key === import.meta.env.VITE_APP_DEFAULT_ALIAS) {
    rootList.alias = "";
  }

  return [
    rootList,
    {
      path: `/${key}/create`,
      meta: {
        module: key,
      },
      name: `${capitalize(key)}Create`,
      component: () => import(`@/components/ModuleDetail.vue`),
    },
    {
      path: `/${key}/:id`,
      meta: {
        module: key,
      },
      name: `${capitalize(key)}Detail`,
      component: () => import(`@/components/ModuleDetail.vue`),
    },
  ];
};

const children = import.meta.env.VITE_APP_MODULES.split(",").flatMap(
  (key: string) => {
    return getModuleRoutes(key);
  }
);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Authenticated.vue"),
    children,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
];

export { routes };
