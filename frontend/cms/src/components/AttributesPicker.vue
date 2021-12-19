<template>
  <div class="attributes-picer">
    <v-card outlined>
      <v-list flat subheader>
        <v-subheader>Аттрибуты</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-container>
              <v-row>
                <v-col>
                  <picker
                    label="Аттрибут"
                    model="attribute"
                    return-object
                    textSelector="name"
                    v-model="currentAttribute"
                  ></picker>
                </v-col>
                <v-col>
                  <div class="d-flex align-center">
                    <v-text-field
                      label="Значение"
                      outlined
                      v-model="currentValue"
                    ></v-text-field>
                    <v-btn
                      class="mb-9 ml-6"
                      large
                      color="primary"
                      @click="onAdd"
                      :disabled="!(currentAttribute && currentValue)"
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
              >{{ item.attribute.name }}: {{ item.value }}</v-list-item-title
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
import { mapActions, mapState } from "vuex";
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
  },
  data: () => ({
    currentAttribute: null,
    currentValue: "",
    search: "",
    showChooseModel: false,
  }),
  methods: {
    ...mapActions("attribute", ["getEntities"]),
    onAdd() {
      this.$emit("input", [
        ...this.value,
        { attribute: this.currentAttribute, value: this.currentValue },
      ]);
      this.currentAttribute = null;
      this.currentValue = "";
    },
    deleteItem(index) {
      const newValue = cloneDeep(this.value);
      newValue.splice(index, 1);
      this.$emit("input", newValue);
    },
  },
  computed: {
    ...mapState("attribute", ["entities"]),
  },
  async beforeMount() {
    await this.getEntities();
  },
};
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
}

.attributes-picer {
  margin-bottom: 16px;
}
</style>
