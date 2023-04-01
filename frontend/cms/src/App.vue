<template>
  <Suspense>
    <v-app>
      <router-view></router-view>
      <v-snackbar
        v-for="(notification, index) in notificationStore.notifications"
        :key="index"
        :color="notification.color"
        position="sticky"
        location="top right"
        :model-value="true"
        :style="getOffsetStyle(index)"
      >
        {{ notification.content }}
        <template v-slot:actions>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="notificationStore.closeAlert(index)"
          >
          </v-btn>
        </template>
      </v-snackbar> </v-app
  ></Suspense>
</template>

<script setup lang="ts">
import { useNotificationStore } from "./stores/notification";

const notificationStore = useNotificationStore();
const getOffsetStyle = (index: number) => {
  return {
    transform: `translateY(${index * 64}px)`,
  };
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
</style>
