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
      <template #item.path="{ item }">
        <a :href="item.raw.path" target="_blank">{{ item.raw.path }}</a>
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
            <v-btn color="primary" variant="text" @click="addnewFile">
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
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { client } from "@/plugins/axios";
import { computed, inject, ref } from "vue";
import { toFormData } from "axios";

interface Props {
  modelValue?: Array<Record<string, unknown> | File>;
  title?: string;
  icon?: string;
  type?: string;
}

const loading = inject("loading", ref(false));
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return [];
  },
  title: "",
  icon: "mdi-file",
  type: "file",
});

const emits = defineEmits(["update:model-value"]);

const selected = ref([]);

const fileKey = ref("");

const files = ref();

const showCreate = ref(false);

const headers = ref([
  {
    title: "Ключ",
    value: "pivot.key",
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

const addnewFile = async () => {
  if (files.value.length) {
    const { data } = await client.post(
      "/api/cms/file",
      toFormData({ file: files.value[0] })
    );

    emits("update:model-value", [
      ...props.modelValue,
      { ...data, pivot: { key: fileKey.value, type: props.type } },
    ]);
    showCreate.value = false;

    fileKey.value = "";
    files.value = [];
  }
};

const removeSelected = () => {
  emits(
    "update:model-value",
    props.modelValue.filter(({ id }) => !selected.value.includes(id))
  );

  selected.value = [];
};

const items = computed(() => {
  if (props.modelValue) {
    return props.modelValue;
  } else {
    return [];
  }
});
</script>
