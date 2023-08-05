<template>
  <v-card variant="tonal" flat :loading="loading" :prepend-icon="module.icon" class="mb-8">
    <template #title>
      <span class="ml-2">
        {{ module.title }}
      </span>
    </template>
    <tree-view v-model="selected" :items="items" @item:click="rowClick" :item-title="itemTitle"></tree-view>
    <teleport to="#rightDrawer" v-if="showBlockModal">
      <module-detail :key="`${props.module}-${selectedRow}`" :module="props.module" modal :id="selectedRow"
        v-bind="{ ...$attrs, predefinedValues }" class="relation-modal" @on-close="onModalClose"
        @on-create="onModalCreate"></module-detail>
    </teleport>
    <v-divider></v-divider>
    <v-card-actions>
      <v-tooltip location="top" text="Создать" color="primary">
        <template #activator="{ props }">
          <v-btn icon large v-bind="props" :loading="loading" flat @click="openModal">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Создать</span>
      </v-tooltip>
      <v-tooltip location="top" text="Удалить выбранное" color="primary">
        <template #activator="{ props }">
          <v-btn icon large :loading="loading" v-bind="props" flat @click="removeRelations">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить выбранное</span>
      </v-tooltip>
      <v-menu v-model="showSearch" :close-on-content-click="false" location="right" offset="16">
        <template v-slot:activator="menu">
          <v-tooltip location="top" text="Поиск" color="primary">
            <template #activator="tooltip">
              <v-btn icon large v-bind="{ ...tooltip.props, ...menu.props }" :loading="loading" flat
                @click="showSearch = true">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Поиск</span>
          </v-tooltip>
        </template>

        <v-card width="500">
          <v-card-title>Найти</v-card-title>
          <v-card-text class="mt-2">
            <v-row>
              <v-col>
                <v-autocomplete placeholder="Поиск" v-model="searchedModelValue" item-title="name" return-object chips
                  v-model:search="search" :items="searchedItems" multiple></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn variant="text" @click="
              (showSearch = false), ((searchedModelValue = []), (search = ''))
              ">
              Отмена
            </v-btn>
            <v-btn color="primary" variant="text" @click="addSearchedItems">
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup generic="T">
import { client } from "@/plugins/axios";
import { useModuleStore } from "@/stores/module";
import { orderBy } from "lodash";
import {
  ref,
  computed,
  inject,
  defineAsyncComponent,
  onBeforeUnmount,
  watch,
  provide,
} from "vue";

const ModuleDetail = defineAsyncComponent(
  () => import("@/components/ModuleDetail.vue")
);

const TreeView = defineAsyncComponent(
  () => import("@/components/TreeView.vue")
);

interface Props {
  modelValue: Record<string, unknown>[];
  module: string;
  relationKey: string;
  showActions?: boolean;
  predefinedValues: Record<string, unknown>;
  itemTitle?: string;
}

const moduleStore = useModuleStore();
const showSearch = ref(false);
const search = ref("");
const searchedModelValue = ref([]);
const searchedItems = ref([]);
const loading = inject("loading", ref(false));
const rightDrawer = inject("rightDrawer", ref(false));

const showBlockModal = ref(false);
const selectedRow = ref();

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  showActions: false,
  itemTitle: "name",
});

const emits = defineEmits(["update:model-value"]);

const selected = ref<string[]>([]);
const items = computed({
  get: () => orderBy(props.modelValue, ["order", "created_at"], ["desc"]),
  set: (newValue) => emits("update:model-value", newValue),
});

const module = computed(() => moduleStore.modules[props.module]);

const headers = computed(() => {
  if (!props.showActions) {
    return module.value.headers;
  }

  const actionsHeader = {
    key: "actions",
    title: "Действия",
  };
  return module.value.headers ? [...module.value.headers, actionsHeader] : [];
});

const openModal = () => {
  showBlockModal.value = true;
  rightDrawer.value = true;
};

const rowClick = (event: Event, item: any) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "DIV") {
    selectedRow.value = item.id;
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

const changeOrder = async (item: Record<string, any>, order: number) => {
  loading.value = true;
  try {
    const { data } = await client.patch(`/api/cms/${module.value.key}/${item.id}`, {
      order: order,
    });

    item.order = data.order

    const index = props.modelValue.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return;
    }

    const newValues = [...props.modelValue];

    newValues.splice(index, 1, data);

    emits("update:model-value", newValues);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const addSearchedItems = async () => {
  try {
    await Promise.all(
      searchedModelValue.value.map((item: Record<string, unknown>) => {
        client.patch(`/api/cms/${module.value.key}/${item.id}`, {
          [props.relationKey]: props.predefinedValues[props.relationKey],
        });
      })
    );

    emits("update:model-value", [
      ...props.modelValue,
      ...searchedModelValue.value,
    ]);
    searchedModelValue.value = [];
    showSearch.value = false;
  } catch (e) {
    console.log(e);
  }
};

const getSearchedItems = async (string = "") => {
  try {
    const { data } = await client.get(`/api/cms/${module.value.key}`, {
      params: {
        search: string,
      },
    });
    searchedItems.value = data;
  } catch (e) {
    console.log(e);
  }
};

watch(
  () => search.value,
  () => {
    getSearchedItems(search.value);
  }
);

onBeforeUnmount(() => {
  onModalClose();
});

provide('changeOrder', changeOrder)

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
