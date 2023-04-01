<template>
  <v-data-table
    v-model="selected"
    show-select
    :headers="headers"
    :items="items"
    :items-length="paginateItems?.total"
    :loading="loading"
    @update:options="getItems"
    @click:row="rowClick"
  >
  <template #top>
    <v-text-field></v-text-field>
  </template>
    <!-- eslint-disable-next-line vue/valid-v-slot-->
    <template #footer.prepend>
      <v-tooltip location="top" text="Создать" color="primary">
        <template #activator="{ props }">
          <v-btn
            icon
            large
            v-bind="props"
            :loading="loading"
            class="mr-4"
            flat
            :to="`/${module.key}/create`"
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
</template>

<script lang="ts" setup>
import { client } from "@/plugins/axios";
import { useModuleStore } from "@/stores/module";
import { capitalize, getModuleKeyByRoute } from "@/utils";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const moduleStore = useModuleStore();
const router = useRouter();
const module = computed(() => moduleStore.modules[getModuleKeyByRoute()]);
const selected = ref([]);
const loading = ref(false);
const paginateItems = ref();
const items = computed(() => paginateItems.value?.data || []);
const headers = ref([
  {
    title: "Заголовок",
    value: "title",
  },
  {
    title: "Ссылка",
    value: "slug",
  },
]);

const getItems = async (options: any) => {
  loading.value = true;
  try {
    const { data } = await client.get(`/api/cms/${module.value.key}`, {
      params: {
        per_page: options.itemsPerPage,
        paginate: true,
      },
    });
    paginateItems.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const rowClick = (event: any, { item: { value } }: any) => {
  if (!(event.target instanceof HTMLInputElement)) {
    router.push({
      name: `${capitalize(module.value.key)}Detail`,
      params: { id: value },
    });
  }
};
</script>
<style lang="scss">
.v-data-table__tr {
  cursor: pointer;
}
</style>
