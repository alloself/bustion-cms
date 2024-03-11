<template>
  <v-card
    variant="tonal"
    flat
    :loading="loading"
    :prepend-icon="icon"
    class="mb-8"
  >
    <template #title>
      <span class="ml-2">
        {{ title }}
      </span>
    </template>
    <v-data-table
      v-model="selected"
      show-select
      :headers="headers"
      :items="items"
      :loading="loading"
    >
      <template #bottom><div></div></template>
      <template #[`item.pivot.key`]="{ item }">
        <v-text-field
          density="compact"
          hide-details
          v-model="item.pivot.key"
        ></v-text-field>
      </template>
      <template #[`item.path`]="{ item }">
        <a :href="item.path" target="_blank">{{ item.path }}</a>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-menu
        v-model="showCreate"
        :close-on-content-click="false"
        location="right"
        offset="16"
      >
        <template v-slot:activator="menu">
          <v-tooltip location="top" text="Создать" color="primary">
            <template #activator="tooltip">
              <v-btn
                icon
                large
                v-bind="{ ...tooltip.props, ...menu.props }"
                :loading="loading"
                flat
                @click="showCreate = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Создать</span>
          </v-tooltip>
        </template>

        <v-card width="500">
          <v-card-title>Добавить</v-card-title>
          <v-card-text class="mt-2">
            <v-row>
              <v-col cols="6">
                <v-text-field label="Ключ" v-model="fileKey"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-file-input label="Файл" v-model="files"></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              variant="text"
              @click="(showCreate = false), ((fileKey = ''), (files = []))"
            >
              Отмена
            </v-btn>
            <v-btn color="primary" variant="text" @click="addNewFile">
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-tooltip location="top" text="Удалить выбранное" color="primary">
        <template #activator="{ props }">
          <v-btn
            icon
            large
            :loading="loading"
            v-bind="props"
            flat
            @click="removeSelected"
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
                <v-text-field label="Ключ" v-model="fileKey"></v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  placeholder="Поиск"
                  v-model="searchedModelValue"
                  item-title="name"
                  return-object
                  chips
                  v-model:search="search"
                  :items="searchedItems"
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
                (showSearch = false), ((searchedModelValue = {}), (search = ''))
              "
            >
              Отмена
            </v-btn>
            <v-btn color="primary" variant="text" @click="addExistingFile">
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { client } from "@/shared/api/axios";
import { computed, inject, ref, watch } from "vue";
import { toFormData } from "axios";
import { IFilesTableProps } from "@/shared/types";



const loading = inject("loading", ref(false));
const { modelValue = [], type = 'file', icon = 'mdi-file' } = defineProps<IFilesTableProps>()

const emits = defineEmits(["update:model-value"]);

const selected = ref<string[]>([]);

const fileKey = ref("");

const files = ref();

const showCreate = ref(false);
const showSearch = ref(false);
const search = ref("");
const searchedModelValue = ref();
const searchedItems = ref([]);

const headers = ref([
  {
    title: "Ключ",
    value: "pivot.key",
    key: "pivot.key",
  },
  {
    title: "Файл",
    key: "name",
  },
  {
    title: "Ссылка на файл",
    key: "path",
  },
]);

const addNewFile = async () => {
  if (files.value.length) {
    const { data } = await client.post(
      "/api/admin/file",
      toFormData({ file: files.value[0] })
    );

    emits("update:model-value", [
      ...modelValue,
      { ...data, pivot: { key: fileKey.value, type: type } },
    ]);
    showCreate.value = false;

    fileKey.value = "";
    files.value = [];
  }
};

const addExistingFile = async () => {
  emits("update:model-value", [
    ...modelValue,
    {
      ...searchedModelValue.value,
      pivot: { key: fileKey.value, type: type },
    },
  ]);

  showSearch.value = false
};

const getSearchedItems = async (string = "") => {
  try {
    const { data } = await client.get(`/api/admin/file`, {
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

const removeSelected = () => {
  emits(
    "update:model-value",
    modelValue.filter(({ id }) => !selected.value.includes(id))
  );

  selected.value = [];
};

const items = computed(() => modelValue);
</script>
