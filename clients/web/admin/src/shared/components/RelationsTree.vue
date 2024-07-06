<template>
  <v-card
    variant="tonal"
    flat
    :loading="loading"
    :prepend-icon="module.icon"
    class="mb-8"
  >
    <template #title>
      <span class="ml-2">
        {{ module.title }}
      </span>
    </template>
    <tree-view
      v-model="selected"
      :items="items"
      @item:click="rowClick"
      :item-title="itemTitle"
    ></tree-view>
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
      <v-menu
        v-model="showSearch"
        :close-on-content-click="false"
        location="right"
        offset="16"
      >
        <template v-slot:activator="menu">
          <v-tooltip location="top" text="Поиск" color="primary">
            <template #activator="tooltip">
              <v-btn
                icon
                large
                v-bind="{ ...tooltip.props, ...menu.props }"
                :loading="loading"
                flat
                @click="showSearch = true"
              >
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
                <v-autocomplete
                  placeholder="Поиск"
                  v-model="searchedModelValue"
                  :itemTitle="itemTitle"
                  return-object
                  chips
                  v-model:search="search"
                  :items="searchedItems"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              variant="text"
              @click="
                (showSearch = false), ((searchedModelValue = []), (search = ''))
              "
            >
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

<script lang="ts" setup generic="T extends ITreeItem">
import { client } from "@/shared/api/axios";
import { useModuleStore } from "@/entities/module/store";
import { orderBy } from "lodash";
import { ref, computed, inject, watch, provide } from "vue";
import {
  IRelationTreeProps,
  ITreeItem,
  relationTreeChangeOrderFunction,
} from "@/shared/types";
import ModuleDetail from "@/shared/components/ModuleDetail.vue";
import TreeView from "@/shared/components/TreeView.vue";
import { useModalsStore } from "@/app/store/modules/modals";

const modalsStore = useModalsStore();
const moduleStore = useModuleStore();

const showSearch = ref(false);
const search = ref("");
const searchedModelValue = ref([]);
const searchedItems = ref([]);
const loading = inject("loading", ref(false));

const showBlockModal = ref(false);
const selectedRow = ref();

const {
  modelValue = [],
  moduleKey,
  //relationKey = {},
  initialValues,
  itemTitle = "name",
} = defineProps<IRelationTreeProps<T>>();

const emits = defineEmits(["update:model-value", "create:children"]);

const selected = ref<ITreeItem[]>([]);
const items = computed({
  get: () => orderBy(modelValue, ["order", "created_at"], ["desc"]),
  set: (newValue) => emits("update:model-value", newValue),
});

const module = computed(() => moduleStore.modules[moduleKey]);

const onCreate = (entitiy: ITreeItem) => {
  emits('create:children', entitiy);
  emits("update:model-value", [...modelValue, entitiy]);
  showBlockModal.value = false;
  modalsStore.onModalClose();
};

const openModal = () => {
  const modalConfig = {
    component: ModuleDetail,
    props: {
      modal: true,
      moduleKey,
      initialValues,
    },
    actions: {
      onClose: modalsStore.onModalClose,
      onCreate,
    },
  }
  modalsStore.addModal(modalConfig);

  modalsStore.show = true;
};

const rowClick = (event: Event, item: ITreeItem) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "DIV") {
    selectedRow.value = item.id;

    const modelConfig = {
      component: ModuleDetail,
      props: {
        modal: true,
        moduleKey,
        id: item.id,
      },
      actions: {
        onClose: modalsStore.onModalClose,
      },
    }

    modalsStore.addModal(modelConfig);

    modalsStore.show = true;
  }
};

const onSearchInput = (entitiy: Record<string, string>) => {
  if (!modelValue.map(({ id }) => id).includes(entitiy.id)) {
    emits("update:model-value", [...modelValue, entitiy]);
  }
};

const onModalCreate = (entitiy: Record<string, string>) => {
  emits("update:model-value", [...modelValue, entitiy]);
};

const onUpdateModalValue = (value: Record<string, unknown> | string) => {
  console.log(value);
};

const removeRelations = () => {
  selected.value.forEach(async (item) => {
    /*await client.patch(`/api/admin/${module.value.key}/${item.id}`, {
      [relationKey]: null,
    });*/

    emits(
      "update:model-value",
      modelValue.filter((item) => !selected.value.includes(item))
    );
  });
};

const changeOrder = async (item: Record<string, any>, order: number) => {
  loading.value = true;
  try {
    const { data } = await client.patch(
      `/api/admin/${module.value.key}/${item.id}`,
      {
        order: order,
      }
    );

    item.order = data.order;

    const index = modelValue.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return;
    }

    const newValues = [...modelValue];

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
    /*await Promise.all(
      searchedModelValue.value.map((item: Record<string, unknown>) => {
        client.patch(`/api/admin/${module.value.key}/${item.id}`, {
          [relationKey]: initialValues[relationKey],
        });
      })
    );*/

    emits("update:model-value", [...modelValue, ...searchedModelValue.value]);
    searchedModelValue.value = [];
    showSearch.value = false;
  } catch (e) {
    console.log(e);
  }
};

const getSearchedItems = async (string = "") => {
  try {
    const { data } = await client.get(`/api/admin/${module.value.key}`, {
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

provide(relationTreeChangeOrderFunction, changeOrder);
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
