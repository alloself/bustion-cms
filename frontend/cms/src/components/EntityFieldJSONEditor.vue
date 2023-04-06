<template>
  <v-card variant="tonal" flat :loading="loading" :prepend-icon="icon">
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
      :itemsPerPage="items.length"
      :items-length="items.length"
      :loading="loading"
    >
      <template #bottom><div></div></template>
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
                <v-text-field
                  label="Ключ"
                  v-model="newProperty.key"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Значение"
                  v-model="newProperty.value"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn variant="text"> Отмена </v-btn>
            <v-btn color="primary" variant="text" @click="addNewProperty">
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-tooltip location="top" text="Удалить выбранное" color="primary">
        <template #activator="{ props }">
          <v-btn icon large :loading="loading" v-bind="props" flat>
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
import { computed, inject, ref } from "vue";

interface Props {
  modelValue: Record<string, unknown>;
  title?: string;
  icon?: string;
}

const loading = inject("loading", ref(false));
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return {};
  },
  title: "",
  icon: "mdi-code-json",
});

const emits = defineEmits(["update:model-value"]);

const selected = ref([]);
const newProperty = ref({
  key: "",
  value: "",
});
const showCreate = ref(false);

const headers = ref([
  {
    title: "Ключ",
    value: "key",
  },
  {
    title: "Значение",
    value: "value",
  },
]);

const addNewProperty = () => {
  emits("update:model-value", {
    ...props.modelValue,
    [newProperty.value.key]: newProperty.value.value,
  });
  showCreate.value = false;
};

const items = computed(() => {
  if (props.modelValue) {
    return Object.keys(props.modelValue).map((key) => {
      return {
        key: key,
        value: props.modelValue[key],
      };
    });
  } else {
    return [];
  }
});
</script>
