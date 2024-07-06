<template>
  <v-list-group v-if="item.children && item.children.length" :expand-icon="undefined">
    <template #activator="{ props, isOpen }">
      <v-list-item @click="(e) => onItemClick(e, item)" v-bind="{ class: props.class, id: props.id }">
        <template #title>
          <slot name="content" :item="item">{{ getTitle(item) }}</slot>
        </template>

        <template #prepend>
          <v-list-item-action start>
            <v-checkbox-btn :model-value="selected.includes(item.id)" @click="onSelect(item)"></v-checkbox-btn>
          </v-list-item-action>
          <v-list-item-action start>
            <v-btn icon="mdi-chevron-down" variant="text" size="small" @click="props.onClick" class="expand-icon"
              :class="{ active: isOpen }"></v-btn>
          </v-list-item-action>

        </template>

        <template #append>
          <v-list-item-action end>
            <div style="margin-left: -12px">
              <v-btn icon="mdi-arrow-up-bold-circle-outline" size="small" variant="text"
                @click="changeOrder(item, Number(item.order) + 1)">
              </v-btn>
             
              <v-btn icon="mdi-arrow-down-bold-circle-outline" size="small" variant="text"
                @click="changeOrder(item, Number(item.order) - 1)">
              </v-btn>
            </div>
          </v-list-item-action>
        </template>
      </v-list-item>
    </template>
    <div style="margin-left: 32px">
      <tree-view-item v-for="childItem in getSorterdChildren(item.children)" :key="childItem.id" :item="childItem"
        :item-title="itemTitle"></tree-view-item>
    </div>
  </v-list-group>

  <v-list-item v-else @click="(e) => onItemClick(e, item)">

    <template #title>
      <slot name="content" :item="item">{{ getTitle(item) }}</slot>
    </template>

    <template #prepend>
      <v-list-item-action start>
        <v-checkbox-btn :model-value="selected.includes(item.id)" @click="onSelect(item)"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <template #append>
      <v-list-item-action end>
        <div class="d-flex items-center ga-2">
          <v-btn icon="mdi-arrow-up-bold-circle-outline" size="small" flat
            @click="changeOrder(item, Number(item.order) + 1)">
          </v-btn>
          <v-text-field class="centered-input" :model-value="item.order" @update:model-value="(v) => changeOrder(item, Number(v))"  hide-details="auto" density="compact"> </v-text-field>
          <v-btn icon="mdi-arrow-down-bold-circle-outline" size="small" flat
            @click="changeOrder(item, Number(item.order) - 1)">
          </v-btn>
        </div>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { get, orderBy } from "lodash";
import { inject, ref } from "vue";
import {
  ITreeItem,
  ITreeViewItemProps,
  relationTreeChangeOrderFunction,
  relationTreeOnItemClickFunction,
  relationTreeOnSelectFunction,
} from "@/shared/types";

const { itemTitle, item } = defineProps<ITreeViewItemProps>();

const selected = inject("selected", ref<string[]>([]));
const onSelect = inject(relationTreeOnSelectFunction, () => { });
const changeOrder = inject(relationTreeChangeOrderFunction, async () => { });
const onItemClick = inject(relationTreeOnItemClickFunction, () => { });

const getTitle = (item: ITreeItem) => {
  if (typeof itemTitle === "function") {
    return itemTitle(item);
  } else {
    const key = itemTitle as keyof ITreeItem;
    return get(item, key);
  }
};

const getSorterdChildren = (items: ITreeItem[]) =>
  orderBy(items, ["order", "created_at"], ["desc"]);
</script>

<style lang="scss">
.expand-icon {
  transition: 0.2s ease-in-out;

  &.active {
    transform: rotate(-90deg);
  }
}

.centered-input input {
      text-align: center
    }
</style>
