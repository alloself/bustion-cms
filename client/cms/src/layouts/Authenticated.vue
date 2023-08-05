<template>
  <v-app>
    <v-navigation-drawer v-model="leftDrawer">
      <v-list density="compact" nav>
        <v-list-item
          nav
          v-for="item in appModules"
          :active="$route.fullPath.includes(item.key)"
          :key="item.key"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="`/${item.key}`"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="0" :border="true" class="app-bar">
      <v-app-bar-nav-icon
        @click="leftDrawer = !leftDrawer"
      ></v-app-bar-nav-icon>
      <Logo></Logo>
      <v-app-bar-title>Bustion CMS</v-app-bar-title>
      <template v-slot:append>
        <v-menu
          :open-delay="50"
          :close-delay="50"
          v-model="menu"
          :close-on-content-click="false"
          location="bottom"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-subheader>Пользователь</v-list-subheader>
              <v-list-item
                :title="userStore.user?.name"
                :subtitle="userStore.user?.email"
                class="mb-4"
              >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-subheader>Настройки</v-list-subheader>
            </v-list>

            <v-switch
              class="ml-4"
              color="primary"
              :label="theme.global.name.value"
              :model-value="theme.global.name.value === 'defaultDarkTheme'"
              @update:model-value="toggleTheme"
            ></v-switch>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="primary"
                variant="outlined"
                block
                @click="userStore.logout()"
              >
                Выйти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="slide-x-transition">
          <component :is="Component" :key="routerKey" />
        </transition>
      </router-view>
      <v-navigation-drawer
        v-model="rightDrawer"
        location="right"
        :width="rightDrawerWidth"
        disable-resize-watcher
      >
        <div id="rightDrawer" class="h-100"></div>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
import { computed, defineAsyncComponent, provide, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useModuleStore } from "@/stores/module";
import { useDisplay, useTheme } from "vuetify";
import { useRoute } from "vue-router";

const Logo = defineAsyncComponent(() => import("@/components/Logo.vue"));
const userStore = useUserStore();
const moduleStore = useModuleStore();
const theme = useTheme();
const leftDrawer = ref(true);
const rightDrawer = ref(false);
const menu = ref(false);
const route = useRoute();
const display = useDisplay();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "defaultDarkTheme";
};

const routerKey = computed(() => route.fullPath);

const appModules = computed(() => {
  return Object.values(moduleStore.modules).filter((item) => item.list);
});

const rightDrawerWidth = computed(() => {
  return (display.width.value - 256) / 2 || 1000;
});

provide("rightDrawer", rightDrawer);
</script>

<style lang="scss" scoped>
.app-bar {
  border-left: none;
  border-right: none;
}
</style>
