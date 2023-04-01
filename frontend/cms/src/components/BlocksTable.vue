<template>
  <v-data-table
    v-model="selected"
    show-select
    :headers="headers"
    :items="items"
    :items-length="items.length"
    :loading="loading"
    @click:row="rowClick"
  >
    <template #bottom>
      <v-tooltip location="top" text="Создать" color="primary">
        <template #activator="{ props }">
          <v-btn
            icon
            large
            v-bind="props"
            :loading="loading"
            class="mr-4"
            flat
            @click="(showBlockModal = true), (rightDrawer = true)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Создать</span>
      </v-tooltip>
      <v-tooltip location="top" text="Удалить выбранное" color="primary">
        <template #activator="{ props }">
          <v-btn icon large :loading="loading" v-bind="props" flat>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить выбранное</span>
      </v-tooltip>
      <v-spacer></v-spacer>
    </template>
  </v-data-table>
  <teleport to="#rightDrawer" v-if="showBlockModal">
    <module-detail
      module="block"
      modal
      class="relation-modal"
      @on-close="onModalClose"
      @on-create="onModalCreate"
    ></module-detail>
  </teleport>
</template>

<script lang="ts" setup>
import { capitalize } from "@/utils";
import { ref, computed, inject, defineAsyncComponent } from "vue";

const ModuleDetail = defineAsyncComponent(
  () => import("@/components/ModuleDetail.vue")
);

interface Props {
  modelValue: Record<string, unknown>[];
}

const loading = inject("loading", ref(false));
const rightDrawer = inject("rightDrawer", ref(false));

const showBlockModal = ref(false);

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
});

const emits = defineEmits(["update:model-value"]);

const selected = ref([]);
const items = computed({
  get: () => props.modelValue,
  set: (newValue) => emits("update:model-value", newValue),
});

const headers = ref([
  {
    title: "#",
    value: "id",
  },
  {
    title: "Название блока",
    value: "name",
  },
]);

const rowClick = (event: any, { item: { value } }: any) => {
  if (!(event.target instanceof HTMLInputElement)) {
    router.push({
      name: `${capitalize(module.value.key)}Detail`,
      params: { id: value },
    });
  }
};

const onModalCreate = (entitiy: Record<string, string>) => {};

const onUpdateModalValue = (value: Record<string, unknown> | string) => {};

const onModalClose = () => {
  showBlockModal.value = false;
  if (document.getElementById("rightDrawer")?.childNodes.length === 2) {
    rightDrawer.value = false;
  }
};
</script>
<style lang="scss">
.v-data-table__tr {
  cursor: pointer;
}
.relation-modal {
  position: absolute;
}
</style>
