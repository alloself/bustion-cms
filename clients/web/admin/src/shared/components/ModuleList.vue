<template>
  <v-data-table-server
    :headers="module.headers"
    show-select
    v-model="selected"
    :items-length="serverData?.total || 0"
    :items="serverData?.data"
    :loading="loading"
    v-bind="options"
    @click:row="rowClick"
    fixed-header
    :height="`calc(100svh - ${mainRect.top + 54 + 40}px)`"
    fixed-footer
  >
    <template #loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template #top>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        :density="'compact'"
        label="Поиск"
        v-model="search"
        clearable
        hide-details
        @click:clear="setSearch"
        @keypress.enter="setSearch"
        single-line
      ></v-text-field>
    </template>
    <template #bottom>
      <hr class="v-divider" aria-orientation="horizontal" role="separator" />
      <div class="v-data-table-footer">
        <v-tooltip location="top" text="Создать" color="primary">
          <template #activator="{ props }">
            <v-btn
              icon
              size="small"
              v-bind="props"
              :loading="loading"
              class="mr-4"
              flat
              :to="{ name: `${capitalize(module.key)}Create` }"
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
              size="small"
              :loading="loading"
              v-bind="props"
              flat
              @click="deleteMany"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Удалить выбранное</span>
        </v-tooltip>

        <v-spacer></v-spacer>
        <v-pagination
          :density="'compact'"
          rounded="circle"
          :showFirstLastPag="true"
          v-model="options.page"
          :length="serverData?.last_page"
          :total-visible="6"
        ></v-pagination>
      </div>
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup generic="T extends IModuleItem">
import { computed, onBeforeMount, onUpdated, ref, watch } from "vue";
import { useLayout } from "vuetify";
import { client } from "@/shared/api/axios";
import { useModuleStore } from "@/entities/module/store";
import { capitalize } from "lodash";
import { IModuleItem, IModuleListProps, IServerDataList } from "@/shared/types";
import { useRoute, useRouter } from "vue-router";

const { moduleKey } = defineProps<IModuleListProps>();
const router = useRouter();
const moduleStore = useModuleStore();
const { mainRect } = useLayout();
const route = useRoute();
const loading = ref(false);
const serverData = ref<IServerDataList & { data: T[] }>();
const search = ref((route.query.search as string) || "");
const selected = ref<string[]>([]);

const options = ref();

const module = computed(() => moduleStore.modules[moduleKey]);

const getItems = async (options: Record<string, unknown>) => {
  loading.value = true;
  try {
    const params = {
      page: options.page,
      per_page: options.itemsPerPage,
      paginate: true,
      search: search.value,
    };
    const { data } = await client.get(`/api/admin/${moduleKey}`, {
      params,
    });
    router.replace({
      query: {
        page: data.current_page,
        per_page: data.per_page,
        search: search.value,
      },
    });

    serverData.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const setSearch = () => {
  getItems(options.value);
};

const rowClick = (event: InputEvent, { item }: { item: T }) => {
  if (!(event.target instanceof HTMLInputElement)) {
    router.push({
      name: `${capitalize(module.value.key)}Detail`,
      params: { id: item.id },
    });
  }
};

const deleteMany = async () => {
  loading.value = true;
  try {
    await client.post(`/api/admin/destroy/${moduleKey}`, selected.value);
    getItems(options.value);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(() => {
  options.value = {
    page: Number(route.query.page) || 1,
    itemsPerPage: Number(route.query.per_page) || 5,
  };
});

watch(
  options,
  async (value) => {
    await getItems(value);
  },
  {
    deep: true,
  }
);

watch(
  () => route.query,
  (v) => {
    if (!Object.keys(v).length) {
      options.value = {
        page: Number(route.query.page) || 1,
        itemsPerPage: Number(route.query.per_page) || 5,
      };
    }
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss">
.v-data-table__tr {
  cursor: pointer;
}
</style>
