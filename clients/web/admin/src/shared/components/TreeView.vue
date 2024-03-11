<template>
  <v-list density="compact" nav return-object>
    <tree-view-item v-for="(item, index) in sortedItems" :key="index" :item="item"
      :item-title="itemTitle"></tree-view-item>
  </v-list>
</template>

<script setup lang="ts">
import { orderBy } from "lodash";
import { computed, provide } from "vue";
import {
  ITreeItem,
  ITreeViewProps,
  relationTreeOnItemClickFunction,
  relationTreeOnSelectFunction,
} from "@/shared/types";

import TreeViewItem from "@/shared/components/TreeViewItem.vue";

const { modelValue = [], items = [] } = defineProps<ITreeViewProps>();

const emits = defineEmits<{
  "update:model-value": [value: ITreeItem[]];
  "item:click": [event: Event, value: ITreeItem];
}>();

const sortedItems = computed<ITreeItem[]>(() =>
  orderBy(items, ["order", "created_at"], ["desc"])
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toFlat = (item: ITreeItem) => {
  const value = [];
  value.push(item);

  if (item.children) {
    item.children.forEach((el) => {
      value.push(...toFlat(el));
    });
  }

  return value;
};

const onSelect = (item: ITreeItem) => {
  const values = [...modelValue, item]
  emits("update:model-value", values);
};

const onItemClick = (e: Event, item: ITreeItem) =>
  emits("item:click", e, item);

provide("selected", modelValue);
provide(relationTreeOnSelectFunction, onSelect);
provide(relationTreeOnItemClickFunction, onItemClick);
</script>
