<template>
  <v-autocomplete
    :clearable="!readonly"
    :readonly="readonly"
    :loading="loading || itemsLoading"
    :model-value="(itemsLoading ? null : modelValue as any)"
    @update:model-value="(onUpdateModalValue as any)"
    v-model:search="search"
    :prepend-icon="readonly ? '' : 'mdi-plus'"
    :prepend-inner-icon="modelValue && !readonly ? 'mdi-pencil' : ''"
    v-bind="$attrs"
    @click:prepend="addRelation"
    @click:prependInner="editRelation"
    no-data-text="Нет данных"
    :items="items"
  ></v-autocomplete>
</template>

<script setup lang="ts" generic="T extends IModuleItem">
//@ts-ignore
import { useModuleStore } from "@/entities/module/store";
import { IModuleItem, IRelationAutocompleteProps } from "@/shared/types";
import { computed, ref } from "vue";
import { client } from "@/shared/api/axios";
import { watch } from "vue";
import { debounce } from "lodash";
import { useModalsStore } from "@/app/store/modules/modals";
import ModuleDetail from "@/shared/components/ModuleDetail.vue";

const moduleStore = useModuleStore();
const modalsStore = useModalsStore();

const { readonly, moduleKey, modelValue,loading } =
  defineProps<IRelationAutocompleteProps>();

const emits = defineEmits<{
  "update:model-value": [value: string | T];
}>();

const module = computed(() => moduleStore.modules[moduleKey]);
const items = ref<T[]>([]);
const search = ref("");
const itemsLoading = ref(false);

const getItems = async (options: Record<string, string> = { }) => {
  itemsLoading.value = true;
  try {
    const { data } = await client.get(`/api/admin/${module.value.key}`, {
      params: {
        ...options,
      },
    });
    items.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    itemsLoading.value = false;
  }
};


const addRelation = () => {
  modalsStore.addModal({
    component: ModuleDetail,
    props: {
      modal: true,
      moduleKey,
    },
    actions: {
      onClose:modalsStore.onModalClose,
      onCreate: (item: T) => {
        emits("update:model-value", item.id);
        modalsStore.onModalClose();
      },
    },
  });

  modalsStore.show = true;
};

const onUpdateModalValue = (value: T | string) => {
  emits("update:model-value", value);
};

const editRelation = () => {
  modalsStore.addModal({
    component: ModuleDetail,
    props: {
      modal: true,
      moduleKey,
      id: modelValue,
    },
    actions: {
      onClose: modalsStore.onModalClose,
    },
  });

  modalsStore.show = true;
};

watch(
  () => search.value,
  debounce((value: string, oldValue: string) => {
    if (!value || value === oldValue) {
      return;
    }
    if (value) {
      getItems({ search: value });
    }
  }, 300)
);

watch(
  () => modelValue,
  (value) => {
    if (!value) {
      search.value = "";
    }
    if (value) {
      getItems();
    }
  },{
    immediate:true
  }
);
</script>
