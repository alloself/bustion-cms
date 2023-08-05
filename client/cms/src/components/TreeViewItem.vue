<template>
  <v-list-group v-if="item.children.length" :expand-icon="undefined">
    <template #activator="{ props, isOpen }">
      <v-list-item @click="(e) => onItemClick(e, item)" v-bind="{ class: props.class, id: props.id }">
        <template #title>
          <slot name="content" :item="item">{{ getTitle(item) }}</slot>
        </template>
        <template #prepend>
          <v-list-item-action start>
            <v-btn icon="mdi-chevron-down" variant="text" size="small" @click="props.onClick" class="expand-icon"
              :class="{ active: isOpen }"></v-btn>
          </v-list-item-action>
          <v-list-item-action start>
            <v-checkbox-btn :model-value="selected === item.id" @click="onSelect(item)"></v-checkbox-btn>
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
        <v-checkbox-btn :model-value="selected === item.id" @click="onSelect(item)"></v-checkbox-btn>
      </v-list-item-action>
    </template>
    <template #append>
      <v-list-item-action end>
        <div style="margin-left: -12px">
          <v-btn icon="mdi-arrow-up-bold-circle-outline" size="small" flat
            @click="changeOrder(item, Number(item.order) + 1)">
          </v-btn>
          <v-btn icon="mdi-arrow-down-bold-circle-outline" size="small" flat
            @click="changeOrder(item, Number(item.order) - 1)">
          </v-btn>
        </div>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { orderBy } from "lodash";
import { inject, type Ref } from "vue";

interface Item {
  id: string;
  name: string;
  order: string,
  children: Item[];
}
const props = withDefaults(defineProps<{
  item: Item;
  itemTitle?: keyof Item | ((item: unknown) => string);
}>(), {
  itemTitle: () => 'name'
});

const selected = inject<Ref<string>>("selected");
const onSelect = inject<(item: Item) => void>("onSelect", () => { });
const onItemClick = inject<(e: Event, item: Item) => void>(
  "onItemClick",
  () => { }
);

const getTitle = (item: Item) => {
  if (typeof props.itemTitle === "function") {
    return props.itemTitle(item);
  } else {
    return item[props.itemTitle] as string;
  }
};

const getSorterdChildren = (items:Item[]) => orderBy(items, ["order", "created_at"], ["desc"])


const changeOrder = inject<(item: Item, number: number) => void>('changeOrder',() => {})
</script>
<style lang="scss">
.expand-icon {
  transition: 0.2s ease-in-out;

  &.active {
    transform: rotate(-90deg);
  }
}
</style>
