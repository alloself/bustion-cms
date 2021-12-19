<template>
  <div style="margin-bottom: 16px" class="base-picker">
    <v-card outlined>
      <v-list flat subheader>
        <v-subheader>{{ title }}</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-container>
              <v-row>
                <v-col>
                  <picker
                    label="Выберите или создайте"
                    :model="model"
                    return-object
                    :query="query"
                    textSelector="name"
                    v-model="currentItem"
                  ></picker>
                </v-col>
                <v-col>
                  <div class="d-flex align-center">
                    <picker
                      style="flex: 1"
                      v-if="modelInsert"
                      label="Значение"
                      :model="modelInsert"
                      return-object
                      textSelector="name"
                      v-model="currentValue"
                    ></picker>
                    <v-text-field
                      v-else
                      label="Значение"
                      outlined
                      v-model="currentValue"
                    ></v-text-field>
                    <v-btn
                      class="mb-9 ml-6"
                      large
                      color="primary"
                      @click="onAdd"
                      :disabled="!(currentItem && currentValue)"
                      >Добавить</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, index) in value" :key="index">
          <v-list-item-content>
            <v-list-item-title
              >{{ item[itemText] }}: {{ item[insertKey] }}</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <div class="actions">
              <v-btn icon @click.stop="deleteItem(index)">
                <v-icon>mdi-delete-circle</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { cloneDeep } from "lodash";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: [String, Function],
      default: "name",
    },
    query: {
      type: Object,
      default: () => {},
    },
    model: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    insertKey: {
      type: String,
      default: "value",
    },
    modelInsert: {
      type: String,
    },
  },
  data: () => ({
    currentItem: null,
    currentValue: "",
    searchString: "",
    showChooseModel: false,
    loading: false,
    items: [],
  }),
  methods: {
    ...mapActions("alerts", ["pushAlert"]),
    async getItems(search) {
      this.loading = true;
      const idsStr = this.multiple
        ? this.value.map(({ id }) => id).join(",")
        : this.value
        ? this.value.id
          ? this.value.id
          : this.value
        : null;
      const params = {
        ...this.query,
        ids: idsStr,
      };

      params.search = search;
      try {
        const data = await this.$store.dispatch(
          `${this.model}/nomenclature`,
          params
        );
        this.items = data;
      } catch (e) {
        this.pushAlert({
          type: "error",
          content: e?.data?.exception || "Произошла техническая ошибка",
        });
      } finally {
        this.loading = false;
      }
    },
    onAdd() {
      this.$emit("input", [
        ...this.value,
        { ...this.currentItem, [this.insertKey]: this.currentValue },
      ]);
      this.currentItem = null;
      this.currentValue = "";
    },
    deleteItem(index) {
      const newValue = cloneDeep(this.value);
      newValue.splice(index, 1);
      this.$emit("input", newValue);
    },
  },
  watch: {
    async searchString() {
      if (this.searchString?.length > 3) {
        await this.getItems(this.searchString);
      }
    },
  },
  async beforeMount() {
    await this.getItems(this.searchString);
  },
};
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
}
</style>
