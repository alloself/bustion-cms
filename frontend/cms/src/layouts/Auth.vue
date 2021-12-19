<template>
  <div v-if="user">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense rounded>
        <v-list-item
          link
          exact
          v-for="(item, index) in menu"
          :key="index"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list></v-navigation-drawer
    >

    <v-app-bar app color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <a class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.2 58.51">
          <title>Bustion</title>
          <g>
            <path
              class="color-1"
              d="M23.63.65a5,5,0,0,1,4.94,0l10.58,6,10.49,6.17a5,5,0,0,1,2.46,4.27l.1,12.16-.1,12.17a5,5,0,0,1-2.46,4.27L39.15,51.86l-10.58,6a5.05,5.05,0,0,1-4.94,0l-10.58-6L2.56,45.69A5,5,0,0,1,.1,41.42L0,29.25.1,17.09a5,5,0,0,1,2.46-4.27L13.05,6.65Z"
            />
            <path
              class="color-2"
              d="M26.1,9l8.11,4.6,8,4.73.07,9.32L42.25,37l-8,4.72-8.11,4.6L18,41.68,10,37l-.07-9.33L10,18.31l8-4.73Z"
            />
            <path
              class="color-2"
              d="M34.21,13.58,26.1,9v37.3l8.11-4.6,8-4.72.07-9.33-.07-9.32Z"
            />
            <path
              class="color-2"
              d="M34.21,37.09,26.1,32.5,18,37.09l-8,4.73,8,4.73,8.11,4.59,8.11-4.59,8-4.73Z"
            />
          </g>
        </svg>
      </a>
      <v-toolbar-title>Панель управления конентом</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="user" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            {{ user.email }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in userMenu"
            :key="index"
            dense
            v-on="item.on"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle v-if="item.subtitle">{{
                item.subtitle
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <transition name="slide-x-transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </div>
  <company-layout v-else>
    <v-progress-circular
      :size="50"
      color="primary"
      class="global-loader"
      indeterminate
    ></v-progress-circular>
  </company-layout>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  metaInfo: {
    titleTemplate: "%s | Панель управдения контентом",
  },
  data: () => ({
    drawer: false,
    menu: [
      {
        title: "Страницы",
        to: { name: "PageList" },
      },
      {
        title: "Меню",
        to: { name: "MenuList" },
      },
      {
        title: "Пользователи",
        to: { name: "UserList" },
      },
      {
        title: "Блоки",
        to: { name: "BlockList" },
      },
      {
        title: "Шаблоны",
        to: { name: "TemplateList" },
      },
    ],
  }),
  computed: {
    ...mapState("auth", ["user"]),
    userMenu() {
      const menu = [
        {
          title: "Выход",
          on: {
            click: async () => {
              await this.logout(this.$router);
              this.$router.push({ name: "Login" });
            },
          },
        },
      ];
      return menu;
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>
<style lang="scss" scoped>
.global-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  height: 100%;
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: 16px;
  svg {
    height: 100%;
  }
}
.color-1 {
  fill: var(--v-primary-base);
}
.color-2 {
  fill: #fff;
  opacity: 0.3;
  isolation: isolate;
}
</style>
