<template>
  <v-list density="compact" nav return-object>
    <tree-view-item
      v-for="(item, index) in sortedItems"
      :key="index"
      :item="item"
      :item-title="itemTitle"
    ></tree-view-item>
  </v-list>
</template>

<script setup lang="ts">
import { orderBy } from "lodash";
import { computed, defineAsyncComponent, provide } from "vue";

interface Item {
  id: string;
  name: string;
  children: Item[];
}
const TreeViewItem = defineAsyncComponent(
  () => import("@/components/TreeViewItem.vue")
);
const props = defineProps<{
  items: Item[];
  itemTitle: keyof Item;
  modelValue: Item
}>();

const emits = defineEmits(["item:click",'update:model-value']);

const sortedItems = computed(() => orderBy(props.items, ["order", "created_at"], ["desc"]));

const toFlat = (item: Item) => {
  const value = [] as Item[];
  value.push(item);

  if (item.children) {
    item.children.forEach((el) => {
      value.push(...toFlat(el));
    });
  }

  return value;
};

const onSelect = (item: Item) => {
  emits('update:model-value', [item.id])
};

const onItemClick = (e: Event, item: Item) => emits("item:click", e, item);

provide("selected", () => props.modelValue);
provide("onSelect", onSelect);
provide("onItemClick", onItemClick);
</script>
