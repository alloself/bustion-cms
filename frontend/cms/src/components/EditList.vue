<template>
  <div>
    <v-card outlined>
      <v-list flat :subheader="Boolean(title.length)">
        <v-subheader v-if="title">{{ title }}</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              ><v-btn color="primary" @click="onCreate"
                >Добавить</v-btn
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(item, index) in sortedValue" :key="index">
          <v-list-item-content>
            <v-list-item-title
              class="block-header"
              @click="openItemDetail(item)"
              >{{ getItemText(item) }}</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <div class="actions">
              <picker
                class="template-field"
                dense
                hide-details
                label="Шаблон"
                model="template"
                textSelector="title"
                :value="item.template_id"
                @input="(val) => setTemplate(val, item)"
              ></picker>
              <v-btn
                icon
                @click.stop="decrementOrder(item, index)"
                :disabled="index === sortedValue.length - 1"
              >
                <v-icon>mdi-arrow-down-circle</v-icon>
              </v-btn>
              <v-btn
                icon
                @click.stop="incrementOrder(item)"
                :disabled="index === 0"
              >
                <v-icon>mdi-arrow-up-circle</v-icon>
              </v-btn>
              <v-btn icon @click.stop="deleteItem(index)">
                <v-icon>mdi-delete-circle</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog
      transition="dialog-top-transition"
      :value="showDetailModal"
      @input="closeDetailModal"
    >
      <template>
        <v-card outlined class="modal-detail">
          <v-toolbar color="primary" dark
            >Добавить блок<v-spacer></v-spacer
            ><v-btn icon @click="closeDetailModal">
              <v-icon>mdi-close</v-icon></v-btn
            ></v-toolbar
          >
          <v-card-text>
            <picker
              :multiple="!single"
              v-model="items"
              returnObject
              model="block"
              label="Блоки"
              :textSelector="(item) => (item.name ? item.name : item.id)"
            ></picker>
          </v-card-text>
          <v-card-actions>
            <v-btn depressed color="primary" @click="confrimEntities"
              >Сохранить</v-btn
            ></v-card-actions
          >
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      v-if="showDetailEditModal"
      transition="dialog-top-transition"
      :value="showDetailEditModal"
      @input="closeDetailEditModal"
    >
      <template>
        <BlockDetail
          modal
          :key="modalId"
          :id="modalId"
          @delete="onDeleteEditModal"
          @close="closeDetailEditModal"
          @update="onModalEditUpdate"
        ></BlockDetail>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import { sortBy, cloneDeep } from "lodash";
import BlockDetail from "../pages/Block/BlockDetail.vue";
export default {
  components: {
    BlockDetail,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: [Array, Object],
      default: () => [],
    },
    itemText: {
      type: [String, Function],
      default: "name",
    },
    single: {
      type: Boolean,
      default: false,
    },
    relationPicker: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: [],
    showDetailModal: false,
    showDetailEditModal: false,
    modalId: null,
  }),
  methods: {
    onCreate() {
      this.showDetailModal = true;
    },
    setTemplate(val, item) {
      item.template_id = val;
      this.$emit("input", this.value);
    },
    onDeleteEditModal() {
      this.$emit(
        "input",
        this.value.filter(({ id }) => {
          return id !== this.modalId;
        })
      );
      this.closeDetailEditModal();
    },
    onModalEditUpdate(item) {
      const index = this.sortedValue.findIndex(({ id }) => id === this.modalId);
      this.$set(this.sortedValue, index, {
        ...this.sortedValue[index],
        ...item,
      });
    },
    openItemDetail(item) {
      this.showDetailEditModal = true;
      this.modalId = item?.id;
    },
    closeDetailEditModal() {
      this.showDetailEditModal = false;
    },
    deleteItem(index) {
      const newValue = cloneDeep(this.sortedValue);
      newValue.splice(index, 1);
      this.$emit("input", newValue);
    },
    incrementOrder(item) {
      this.$set(item, "order", ++item.order);
      this.$emit("input", this.value);
    },
    decrementOrder(item) {
      this.$set(item, "order", --item.order);
      this.$emit("input", this.value);
    },
    getItemText(item) {
      return typeof this.itemText === "function"
        ? this.itemText(item)
        : item[this.itemText];
    },
    openDetailModal() {
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
    },
    confrimEntities() {
      if (this.single) {
        this.$emit("input", {
          ...this.items,
          order: 0,
        });
      } else {
        this.$emit("input", [
          ...this.value,
          ...this.items.map((item) => {
            return {
              ...item,
              order: 0,
            };
          }),
        ]);
      }

      this.items = [];
      this.closeDetailModal();
    },
  },
  computed: {
    sortedValue() {
      if (this.single) {
        return this.value && !Array.isArray(this.value) ? [this.value] : [];
      } else {
        return sortBy(this.value, "order").reverse();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
}
.block-header {
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    color: var(--v-primary-base);
  }
}
.template-field {
  margin-right: 16px !important;
}
</style>
