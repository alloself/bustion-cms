<template>
  <v-data-table-server
    v-model="selected"
    show-select
    :headers="module.headers"
    :items="items"
    :items-length="paginateItems?.total || 0"
    :loading="loading"
    @update:options="onUpdateOptions"
    @click:row="rowClick"
  >
    <template #[`footer.prepend`]>
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
          <v-btn
            icon
            large
            :loading="loading"
            v-bind="props"
            flat
            :disabled="!selected.length"
            @click="deleteList"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить выбранное</span>
      </v-tooltip>
      <v-btn
        class="ml-4"
        v-if="module.key === 'file'"
        :loading="loading"
        flat
        @click="deleteUnused"
        >Удалить неиспользуемые
      </v-btn>
      <v-spacer></v-spacer>
    </template>
  </v-data-table-server>
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
const options = ref();

const onUpdateOptions = async (value: any) => {
  options.value = value;
  await getItems(options.value);
};

const getItems = async (options: any) => {
  loading.value = true;
  try {
    const { data } = await client.get(`/api/cms/${module.value.key}`, {
      params: {
        page: options.page,
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

const deleteList = async () => {
  try {
    await client.post(`/api/cms/destroy/${module.value.key}`, selected.value);
    selected.value = [];
    await getItems(options.value);
  } catch (e) {
    console.log(e);
  }
};

const deleteUnused = async () => {
  try {
    await client.post(`/api/cms/${module.value.key}/unused`);
    await getItems(options.value);
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss">
.v-data-table__tr {
  cursor: pointer;
}
</style>
