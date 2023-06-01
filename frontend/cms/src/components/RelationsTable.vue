<template>
  <v-card variant="tonal" flat :loading="loading" :prepend-icon="module.icon" class="mb-8">
    <template #title>
      <span class="ml-2">
        {{ module.title }}
      </span>
    </template>
    <v-data-table
      v-model="selected"
      show-select
      :headers="module.headers || []"
      :items="items"
      :itemsPerPage="items.length"
      :items-length="items.length"
      :loading="loading"
      @click:row="rowClick"
    >
      <template #bottom><div></div></template>
    </v-data-table>
    <teleport to="#rightDrawer" v-if="showBlockModal">
      <module-detail
        :key="`${props.module}-${selectedRow}`"
        :module="props.module"
        modal
        :id="selectedRow"
        v-bind="$attrs"
        class="relation-modal"
        @on-close="onModalClose"
        @on-create="onModalCreate"
      ></module-detail>
    </teleport>
    <v-divider></v-divider>
    <v-card-actions>
      <v-tooltip location="top" text="Создать" color="primary">
        <template #activator="{ props }">
          <v-btn
            icon
            large
            v-bind="props"
            :loading="loading"
            flat
            @click="openModal"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Создать</span>
      </v-tooltip>
      <v-tooltip location="top" text="Удалить выбранное" color="primary">
        <template #activator="{ props }">
          <v-btn
            icon
            large
            :loading="loading"
            v-bind="props"
            flat
            @click="removeRelations"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить выбранное</span>
      </v-tooltip>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { client } from "@/plugins/axios";
import { useModuleStore } from "@/stores/module";
import {
  ref,
  computed,
  inject,
  defineAsyncComponent,
  onBeforeUnmount,
} from "vue";

const ModuleDetail = defineAsyncComponent(
  () => import("@/components/ModuleDetail.vue")
);

interface Props {
  modelValue: Record<string, unknown>[];
  module: string;
  relationKey: string;
}

const moduleStore = useModuleStore();

const loading = inject("loading", ref(false));
const rightDrawer = inject("rightDrawer", ref(false));

const showBlockModal = ref(false);
const selectedRow = ref();

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
});

const emits = defineEmits(["update:model-value"]);

const selected = ref<string[]>([]);
const items = computed({
  get: () => props.modelValue,
  set: (newValue) => emits("update:model-value", newValue),
});

const module = computed(() => moduleStore.modules[props.module]);

const openModal = () => {
  showBlockModal.value = true;
  rightDrawer.value = true;
};

const rowClick = (event: any, { item: { value } }: any) => {
  if (!(event.target instanceof HTMLInputElement)) {
    selectedRow.value = value;
    openModal();
  }
};

const onSearchInput = (entitiy: Record<string, string>) => {
  if (!props.modelValue.map(({ id }) => id).includes(entitiy.id)) {
    emits("update:model-value", [...props.modelValue, entitiy]);
  }
};

const onModalCreate = (entitiy: Record<string, string>) => {
  emits("update:model-value", [...props.modelValue, entitiy]);
  showBlockModal.value = false;
  if (document.getElementById("rightDrawer")?.childNodes.length === 2) {
    rightDrawer.value = false;
  }
};

const onUpdateModalValue = (value: Record<string, unknown> | string) => {
  console.log(value);
};

const onModalClose = () => {
  selectedRow.value = null;
  showBlockModal.value = false;
  console.log(document.getElementById("rightDrawer")?.childNodes.length)
  if (document.getElementById("rightDrawer")?.childNodes.length === 2) {
    rightDrawer.value = false;
  }
};

const removeRelations = () => {
  selected.value.forEach(async (item) => {
    await client.patch(`/api/cms/${module.value.key}/${item}`, {
      [props.relationKey]: null,
    });

    emits(
      "update:model-value",
       //@ts-ignore
      props.modelValue.filter((item) => !selected.value.includes(item.id))
    );
  });
};

onBeforeUnmount(() => {
  onModalClose();
});
</script>
<style lang="scss">
.v-data-table__tr {
  cursor: pointer;
}
.relation-modal {
  position: absolute;
}
.v-card-item__prepend {
  margin-left: -8px;
}
</style>
