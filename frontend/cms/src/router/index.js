import Vue from "vue";
import VueRouter from "vue-router";
import { getValue } from "@/utils";
import { TOKEN } from "@/const";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/Auth.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/user",
        name: "UserList",
        meta: {
          menu: {
            title: "Пользователи",
          },
        },
        component: () => import("@/pages/User/UserList.vue"),
      },
      {
        path: "/user/:id",
        name: "UserDetail",
        component: () => import("@/pages/User/UserDetail.vue"),
      },
      {
        path: "/page",
        alias: "",
        name: "PageList",
        meta: {
          menu: {
            title: "Страницы",
          },
        },
        component: () => import("@/pages/Page/PageList.vue"),
      },
      {
        path: "/page/create",
        name: "PageCreate",
        component: () => import("@/pages/Page/PageDetail.vue"),
      },
      {
        path: "/page/:id",
        name: "PageDetail",
        component: () => import("@/pages/Page/PageDetail.vue"),
      },
      {
        path: "/menu",
        alias: "",
        name: "MenuList",
        meta: {
          menu: {
            title: "Страницы",
          },
        },
        component: () => import("@/pages/Menu/MenuList.vue"),
      },
      {
        path: "/menu/create",
        name: "MenuCreate",
        component: () => import("@/pages/Menu/MenuDetail.vue"),
      },
      {
        path: "/menu/:id",
        name: "MenuDetail",
        component: () => import("@/pages/Menu/MenuDetail.vue"),
      },
      {
        path: "/block",
        alias: "",
        name: "BlockList",
        meta: {
          menu: {
            title: "Блок",
          },
        },
        component: () => import("@/pages/Block/BlockList.vue"),
      },
      {
        path: "/block/create",
        name: "BlockCreate",
        component: () => import("@/pages/Block/BlockDetail.vue"),
      },
      {
        path: "/block/:id",
        name: "BlockDetail",
        component: () => import("@/pages/Block/BlockDetail.vue"),
      },
      {
        path: "/template",
        alias: "",
        name: "TemplateList",
        meta: {
          menu: {
            title: "Шаблоны",
          },
        },
        component: () => import("@/pages/Template/TemplateList.vue"),
      },
      {
        path: "/template/create",
        name: "TemplatCreate",
        component: () => import("@/pages/Template/TemplateDetail.vue"),
      },
      {
        path: "/template/:id",
        name: "TemplateDetail",
        component: () => import("@/pages/Template/TemplateDetail.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/cms/",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = getValue(TOKEN);
    if (!token) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
