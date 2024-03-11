<template>
  <suspense>
    <v-app>
      <v-layout>
        <router-view v-slot="{ Component, route }">
          <component :is="route.meta.layout">
            <component :is="Component" :key="route.fullPath" />
          </component>
        </router-view>
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
        </v-snackbar>
      </v-layout>
    </v-app>
  </suspense>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/entities/notify/store";
import { useModalsStore } from "@/app/store/modules/modals";
import { useRoute } from "vue-router";
import { watch } from "vue";

const notificationStore = useNotificationStore();
const modalsStore = useModalsStore();
const route = useRoute();
const getOffsetStyle = (index: number) => {
  return {
    transform: `translateY(${index * 64}px)`,
  };
};

watch(
  () => route.fullPath,
  () => {
    modalsStore.show = false;
    modalsStore.modals = []
  }
);
</script>
