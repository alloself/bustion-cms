<template>
  <v-navigation-drawer v-model="menuDrawer" >
    <v-list density="compact" nav>
      <v-list-item
        nav
        v-for="item in menuItems"
        :key="item.key"
        :prepend-icon="item.icon"
        link
        :title="item.title"
        :to="{ name: item.to }"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useModuleStore } from "@/entities/module/store";
import { capitalize, sortBy } from "lodash";
import { computed } from "vue";
import { ref } from "vue";
import { inject } from "vue";

const menuDrawer = inject("menuDrawer", ref(false));
const muoduleStore = useModuleStore();

const menuItems = computed(() => {
  return sortBy(Object.values(muoduleStore.modules), ["title"]).map((item) => {
    return { ...item, to: `${capitalize(item.key)}List` };
  }).filter(({list}) => list);
});
</script>
