<template>
  <v-navigation-drawer
    :width="drawerWidth"
    disable-resize-watcher
    location="right"
    :model-value="modalsStore.show"
    @update:model-value="onClose"
    class="modals-wrapper"
  >
    <component
      class="modal"
      v-for="(modal, index) in modals"
      :is="modal.component"
      v-bind="{ ...modal.props }"
      v-on="{ ...modal.actions }"
      :key="index"
    ></component>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useModalsStore } from "@/app/store/modules/modals";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const display = useDisplay();
const modalsStore = useModalsStore();

const drawerWidth = computed(() => {
  return (display.width.value - 256) / 2 || 1000;
});

const { modals } = storeToRefs(modalsStore);

modalsStore.$subscribe((mutation, { modals }) => {
  if (modals.length === 0) {
    modalsStore.show = false;
  }
});

const onClose = () => {
  modalsStore.modals = [];
  modalsStore.show = false;
};
</script>

<style lang="scss">
.modals-wrapper {
  position: relative;

  .modal {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
