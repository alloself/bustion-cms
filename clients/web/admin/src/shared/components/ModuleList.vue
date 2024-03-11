<template>
  <v-data-table-server
    :headers="module.headers"
    show-select
    v-model="selected"
    :items-length="serverData?.total || 0"
    :items="serverData?.data"
    :loading="loading"
    @update:options="onUpdateOptions"
    @click:row="rowClick"
    fixed-header
    :height="`calc(100svh - ${mainRect.top + 54}px)`"
    fixed-footer
  >
    <template #loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

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
            large
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
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup generic="T extends IModuleItem">
import { computed, ref } from "vue";
import { useLayout } from "vuetify";
import { client } from "@/shared/api/axios";
import { useModuleStore } from "@/entities/module/store";
import { capitalize } from "lodash";
import { IModuleItem, IModuleListProps, IServerDataList } from "@/shared/types";
import { useRouter } from "vue-router";

const { moduleKey } = defineProps<IModuleListProps>();
const router = useRouter();
const moduleStore = useModuleStore();
const { mainRect } = useLayout();

const loading = ref(false);
const serverData = ref<IServerDataList & { data: T[] }>();
const options = ref();
const selected = ref<string[]>([]);

const module = computed(() => moduleStore.modules[moduleKey]);

const onUpdateOptions = async (value?: any) => {
  if (value) {
    options.value = value;
  }

  await getItems(options.value);
};

const getItems = async (options: Record<string, unknown>) => {
  loading.value = true;
  try {
    const { data } = await client.get(`/api/admin/${moduleKey}`, {
      params: {
        page: options.page,
        per_page: options.itemsPerPage,
        paginate: true,
      },
    });
    serverData.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
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
    await client.post(
      `/api/admin/destroy/${moduleKey}`,
      selected.value
    );
    console.log(1231)
    await onUpdateOptions()
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.v-data-table__tr {
  cursor: pointer;
}
</style>
