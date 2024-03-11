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

    <v-data-table
      v-model="selected"
      show-select
      :headers="headers"
      :items="items"
      :itemsPerPage="items.length"
      :items-length="items.length"
      :loading="loading"
      @click:row="rowClick"
    >
      <template #bottom>
        <div></div>
      </template>

      <template #[`item.actions`]="{ item }">
        <div style="margin-left: -12px">
          <v-btn
            icon
            large
            :loading="loading"
            flat
            @click.stop="changeOrder(item.id, Number(item.order) + 1)"
          >
            <v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            large
            :loading="loading"
            flat
            @click.stop="changeOrder(item.id, Number(item.order) - 1)"
          >
            <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-tooltip location="top" text="Создать" color="primary">
        <template #activator="{ props }">
          <v-btn
            icon
            large
            v-bind="props"
            :loading="loading"
            @click="addRelation"
            flat
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
                  return-object
                  chips
                  v-model:search="search"
                  :items="searchedItems"
                  :item-title="itemTitle"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn variant="text" @click="onDecline"> Отмена </v-btn>
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

<script lang="ts" setup generic="T extends IModuleItem">
import { client } from "@/shared/api/axios";
import { useModuleStore } from "@/entities/module/store";
import { IModuleItem, IRelationsTableProps } from "@/shared/types";
import { computed, ref, watch } from "vue";
import { orderBy } from "lodash";
import { useModalsStore } from "@/app/store/modules/modals";
import ModuleDetail from "@/shared/components/ModuleDetail.vue";

const {
  moduleKey,
  modelValue,
  relationKey,
  initialValues = {} as T,
  showActions,
  itemTitle,
} = defineProps<IRelationsTableProps<T>>();

console.log(moduleKey);

const emits = defineEmits<{
  "update:model-value": [value: T[]];
}>();

const moduleStore = useModuleStore();
const modalsStore = useModalsStore();

const loading = ref(false);
const showSearch = ref(false);
const search = ref("");
const searchedModelValue = ref([]);
const searchedItems = ref([]);
const selected = ref<string[]>([]);
const selectedRow = ref();

const module = computed(() => moduleStore.modules[moduleKey]);

const items = computed({
  get: () => orderBy(modelValue, ["order", "created_at"], ["desc"]),
  set: (newValue) => emits("update:model-value", newValue),
});

const headers = computed(() => {
  if (!showActions) {
    return module.value.headers || [];
  }

  const actionsHeader = {
    key: "actions",
    title: "Действия",
  };

  const value = module.value.headers
    ? [...module.value.headers, actionsHeader]
    : [];

  return value;
});

const onDecline = () => {
  showSearch.value = false;
  searchedModelValue.value = [];
  search.value = "";
};

const addSearchedItems = async () => {
  try {
    await Promise.all(
      searchedModelValue.value.map((item: T) => {
        client.patch(`/api/admin/${module.value.key}/${item.id}`, {
          [relationKey]: initialValues[relationKey],
        });
      })
    );

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

const removeRelations = () => {
  selected.value.forEach(async (item) => {
    await client.patch(`/api/admin/${module.value.key}/${item}`, {
      [relationKey]: null,
    });
  });

  emits(
    "update:model-value",
    modelValue.filter((el) => !selected.value.includes(el.id))
  );
};

const onCreate = (entitiy: T) => {
  emits("update:model-value", [...modelValue, entitiy]);
  modalsStore.onModalClose();
};

const addRelation = () => {
  modalsStore.addModal({
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
  });

  modalsStore.show = true;
};

const changeOrder = async (id: string, order: number) => {
  loading.value = true;
  try {
    const { data } = await client.patch(
      `/api/admin/${module.value.key}/${id}`,
      {
        order: order,
      }
    );

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

const rowClick = (event: any, value: { item: T }) => {
  if (!(event.target instanceof HTMLInputElement)) {
    selectedRow.value = value.item.id;

    modalsStore.addModal({
      component: ModuleDetail,
      props: {
        modal: true,
        id: value.item.id,
        moduleKey,
        initialValues,
      },
      actions: {
        onClose: modalsStore.onModalClose,
        onCreate,
      },
    });

    modalsStore.show = true;
  }
};

watch(
  () => search.value,
  () => {
    getSearchedItems(search.value);
  }
);
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
