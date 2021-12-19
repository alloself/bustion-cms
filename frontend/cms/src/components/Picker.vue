<template>
  <div class="base-picker">
    <v-autocomplete
      v-bind="$attrs"
      clearable
      outlined
      :loading="loading"
      :label="label"
      :items="items"
      hide-no-data
      :chips="multiple"
      :return-object="multiple || returnObject"
      item-value="id"
      :item-text="textSelector"
      :value="value"
      :multiple="multiple"
      :search-input.sync="searchString"
      :prepend-icon="prependIcon"
      @click:prepend="onPrependClick"
      @input="onInput"
    >
      <template #selection="{ item, index }">
        <v-chip
          :small="$attrs['dense']"
          @click.stop="openDetailModal(item.id)"
          @click:close="removeItem(index)"
          label
          close
          class="selectable"
          >{{ getItemText(item) }}</v-chip
        >
      </template>
    </v-autocomplete>
    <v-dialog
      transition="dialog-top-transition"
      :value="detailModal"
      @input="closeDetailModal"
    >
      <template>
        <component
          :is="modalComponentName"
          modal
          :key="modalId"
          :id="modalId"
          @close="closeDetailModal"
          @create="onModalCreate"
          @update="onModalUpdate"
        ></component>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import { capitalize } from "@/utils";
import { mapActions } from "vuex";
export default {
  props: {
    label: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, Array, String, Number],
      default: function () {
        return this.multiple ? [] : null;
      },
    },
    query: {
      type: Object,
      default: () => {},
    },
    model: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    textSelector: {
      type: [String, Function],
      default: "name",
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    detailModal: false,
    modalId: undefined,
    searchString: "",
    loading: false,
    items: [],
  }),
  computed: {
    prependIcon() {
      return "mdi-plus";
    },
    modalComponentName() {
      const model = capitalize(this.model);
      return () => import(`@/pages/${model}/${model}Detail.vue`);
    },
  },
  methods: {
    ...mapActions("alerts", ["pushAlert"]),
    getItemText(item) {
      return typeof this.textSelector === "function"
        ? this.textSelector(item)
        : item[this.textSelector];
    },
    onPrependClick() {
      if (!this.multiple && this.value) {
        this.openDetailModal(this.value);
      } else {
        this.openDetailModal();
      }
    },
    openDetailModal(id) {
      if (Number(id) && (typeof id === "number" || typeof id === "string")) {
        this.modalId = id;
      }

      this.detailModal = true;
    },
    closeDetailModal() {
      this.modalId = undefined;
      this.detailModal = false;
    },
    async getItems(search) {
      this.loading = true;
      let idsStr = "";
      if (this.value) {
        if (this.multiple) {
          if (this.returnObject) {
            idsStr = this.value.map(({ id }) => id).join(",");
          } else {
            idsStr = this.value;
          }
        } else {
          if (this.returnObject) {
            idsStr = this.value.id;
          } else {
            idsStr = this.value;
          }
        }
      }

      const params = {
        ids: idsStr,
        ...this.query,
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
    onModalCreate(item) {
      this.closeDetailModal();
      this.items.push(item);
      const value = this.multiple
        ? [...this.value, this.returnObject ? item : item.id]
        : this.returnObject
        ? item
        : item.id;
      this.$emit("input", value);
    },
    onModalUpdate(item) {
      const index = this.items.findIndex(({ id }) => id === item.id);
      this.$set(this.items, index, item);
      this.$set(this.value, index, item);
      this.closeDetailModal();
    },
    onInput(items) {
      this.$emit("input", items);
    },
    removeItem(index) {
      if (this.multiple) {
        const copiedValue = this.value.slice();
        copiedValue.splice(index, 1);

        this.$emit("input", copiedValue);
        this.closeDetailModal();
      } else {
        this.$emit("input", null);
        this.closeDetailModal();
      }
    },
  },
  watch: {
    async searchString() {
      if (this.searchString?.length > 1) {
        await this.getItems(this.searchString);
      }
    },
  },
  async beforeMount() {
    await this.getItems(this.searchString);
  },
};
</script>
