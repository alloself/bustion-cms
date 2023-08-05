<template>
  <v-autocomplete
    :model-value="loading? null : modelValue"
    v-model:search="search"
    @update:model-value="onUpdateModalValue"
    v-bind="$attrs"
    :item-value="itemValue"
    :clearable="!$attrs.readonly"
    @click:prepend="addRelationEntity"
    @click:prependInner="editRelationEntity"
    :prepend-icon="$attrs.readonly ? '' : 'mdi-plus'"
    :prepend-inner-icon="modelValue && !$attrs.readonly ? 'mdi-pencil' : ''"
    :loading="$attrs.loading as boolean || loading"
    no-data-text="Нет данных"
    :items="items"
  >
  </v-autocomplete>
  <teleport to="#rightDrawer" v-if="entityModal">
    <module-detail
      :key="`${props.module}-${modalId}`"
      :module="module.key"
      :id="modalId"
      modal
      class="relation-modal"
      @on-close="onModalClose"
      @on-create="onModalCreate"
    ></module-detail>
  </teleport>
</template>

<script setup lang="ts">
import { client } from "@/plugins/axios";
import { useModuleStore } from "@/stores/module";
import {
  computed,
  defineAsyncComponent,
  inject,
  onMounted,
  ref,
  watch,
} from "vue";
const ModuleDetail = defineAsyncComponent(
  () => import("@/components/ModuleDetail.vue")
);

interface IProps {
  module: string;
  modelValue?: string;
  itemValue: string;
}

const emits = defineEmits(["update:model-value"]);
const rightDrawer = inject("rightDrawer", ref(false));
const props = withDefaults(defineProps<IProps>(), {});
const moduleStore = useModuleStore();
const module = computed(() => moduleStore.modules[props.module]);
const search = ref("");
const items = ref<Record<string, unknown>[]>([]);
const loading = ref(false);
const entityModal = ref(false);
const modalId = ref();

const getItems = async (options: any = {}) => {
  loading.value = true;
  try {
    const { data } = await client.get(`/api/cms/${module.value.key}`, {
      params: {
        search: search.value,
        ...options,
      },
    });
    items.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const addRelationEntity = () => {
  entityModal.value = true;
  rightDrawer.value = true;
  modalId.value = null;
};

const editRelationEntity = () => {
  entityModal.value = true;
  rightDrawer.value = true;
  modalId.value = props.modelValue;
};

const onModalCreate = (entitiy: Record<string, string>) => {
  items.value.push(entitiy);
  onUpdateModalValue(entitiy[props.itemValue]);
  onModalClose();
};

const onUpdateModalValue = (value: Record<string, unknown> | string) => {
  emits("update:model-value", value);
};

const onModalClose = () => {
  entityModal.value = false;
  modalId.value = null;
  if (document.getElementById("rightDrawer")?.childNodes.length === 2) {
    rightDrawer.value = false;
  }
};

onMounted(() => {
  if (props.modelValue) {
    getItems();
  }
});

watch(
  () => search.value,
  () => {
    getItems();
  }
);

watch(
  () => props.modelValue,
  (value?: string) => {
    if (value) {
      getItems({ search: value });
    }
  }
);
</script>
<style lang="scss" scoped>
.relation-modal {
  position: absolute;
}
</style>
