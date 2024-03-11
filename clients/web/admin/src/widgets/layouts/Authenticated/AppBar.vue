<template>
  <v-app-bar order="-1" :elevation="0" :border="true" class="app-bar" flat>
    <v-app-bar-nav-icon @click="menuDrawer = !menuDrawer"></v-app-bar-nav-icon>
    <Logo></Logo>
    <v-app-bar-title>Bustion.CMS</v-app-bar-title>
    <template #append>
      <v-menu
        :open-delay="50"
        :close-delay="50"
        v-model="userMenu"
        :close-on-content-click="false"
        location="bottom"
      >
        <template #activator="{ props }">
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
            <v-btn color="primary" variant="outlined" block @click="logout">
              Выйти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import Logo from "@/shared/components/Logo.vue";
import { useUserStore } from "@/entities/user/store";
import { ref } from "vue";
import { inject } from "vue";
import { useRouter } from "vue-router";

const theme = useTheme();
const userStore = useUserStore();
const router = useRouter();
const userMenu = ref(false);
const menuDrawer = inject("menuDrawer", ref(false));

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "defaultDarkTheme";
};

const logout = () => {
  userStore.logout();
  router.push({ name: "Login" });
};
</script>

<style lang="scss">
.app-bar {
  border-left: none;
  border-right: none;
}
</style>
