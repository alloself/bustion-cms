<template>
  <v-data-table
    v-model="selected"
    show-select
    :headers="headers"
    disable-sort
    :options.sync="moduleOptions"
    :items="items"
    :loading="loading"
    class="list-table"
    :server-items-length="pagination ? pagination.total : 0"
    loading-text="Загрузка... Пожалуйста подождите"
    @click:row="toDetailRoute"
    :footer-props="{
      'show-first-last-page': true,
      'items-per-page-options': [5, 10, 15, 30, 50, 100],
    }"
  >
    <template slot="footer.prepend">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            v-bind="attrs"
            v-on="on"
            @click="toCreateRoute"
            :loading="loading"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Создать</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            :loading="loading"
            v-bind="attrs"
            v-on="on"
            :disabled="!selected.length"
            @click="deleteEntities"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить выбранное</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { capitalize } from "@/utils";
export default {
  props: {
    namespace: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    fab: false,
    selected: [],
  }),
  methods: {
    ...mapActions("alerts", ["pushAlert"]),
    async getEntities() {
      this.loading = true;
      try {
        await this.$store.dispatch(`${this.namespace}/getEntities`);
      } catch (e) {
        this.pushAlert({
          type: "error",
          content: e?.data?.exception || "Произошла техническая ошибка",
        });
      } finally {
        this.loading = false;
      }
    },
    async deleteEntities() {
      this.loading = true;
      const ids = this.selected.map(({ id }) => id);
      await this.$store.dispatch(`${this.namespace}/deleteEntities`, ids);
      this.loading = false;
    },
    toCreateRoute() {
      this.$router.push({ name: `${capitalize(this.namespace)}Create` });
    },
    toDetailRoute({ id }) {
      this.$router.push({
        name: `${capitalize(this.namespace)}Detail`,
        params: { id },
      });
    },
  },
  computed: {
    ...mapState({
      pagination(state) {
        return state[this.namespace].pagination;
      },
      options(state) {
        return state[this.namespace].options;
      },
      items() {
        return this.pagination?.data;
      },
    }),
    moduleOptions: {
      get: function () {
        return this.options;
      },
      set: async function (value) {
        if (!this.loading) {
          await this.$store.dispatch(
            `${this.namespace}/setTableOptions`,
            value
          );
          await this.getEntities();
        }
      },
    },
  },
};
</script>
<style>
.list-table tbody tr {
  cursor: pointer;
}
</style>
