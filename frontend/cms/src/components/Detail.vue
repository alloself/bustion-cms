<template>
  <v-container
    v-if="!modal || !loading"
    :fluid="modal"
    :class="{ 'pa-0': modal, 'overflow-hidden': modal }"
  >
    <v-row>
      <v-col>
        <v-card :loading="loading" outlined>
          <v-toolbar color="primary" dark
            >{{ createView ? "Создать" : "Смотреть" }} <v-spacer></v-spacer
            ><v-btn icon v-if="modal" @click="$parent.$emit('close')">
              <v-icon>mdi-close</v-icon></v-btn
            ></v-toolbar
          >
          <v-card-text>
            <v-form>
              <slot
                name="form"
                :setValue="setValue"
                :entity="entity"
                :createView="createView"
              ></slot>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="createView">
            <v-btn
              depressed
              color="primary"
              @click="createEntity"
              :loading="loading"
              >Создать</v-btn
            >
          </v-card-actions>
          <v-card-actions v-else>
            <v-btn
              depressed
              color="primary"
              @click="updateEntity"
              :loading="loading"
              :disabled="!Object.keys(entityPatch).length"
              >Обновить</v-btn
            >
            <v-btn
              depressed
              color="error"
              @click="deleteEntity"
              :loading="loading"
              >Удалить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-card v-else :loading="loading" outlined class="modal-detail">
    <v-toolbar color="primary" dark
      >{{ createView ? "Создать" : "Смотреть" }} <v-spacer></v-spacer
      ><v-btn icon v-if="modal" @click="$parent.$emit('close')">
        <v-icon>mdi-close</v-icon></v-btn
      ></v-toolbar
    >
    <v-card-text>
      <v-form>
        <slot
          name="form"
          :setValue="setValue"
          :entity="entity"
          :createView="createView"
        ></slot>
      </v-form>
    </v-card-text>
    <v-card-actions v-if="createView">
      <v-btn depressed color="primary" @click="createEntity" :loading="loading"
        >Создать</v-btn
      >
    </v-card-actions>
    <v-card-actions v-else>
      <v-btn
        depressed
        color="primary"
        @click="updateEntity"
        :loading="loading"
        :disabled="!Object.keys(entityPatch).length"
        >Обновить</v-btn
      >
      <v-btn depressed color="error" @click="deleteEntity" :loading="loading"
        >Удалить</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { capitalize } from "@/utils";
import { mapActions } from "vuex";
export default {
  props: {
    namespace: {
      type: String,
      required: true,
    },
    formData: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: false,
    entityPatch: {},
    localEntity: {},
  }),
  computed: {
    modal() {
      return "modal" in this.$parent.$attrs;
    },
    id() {
      return this.modal
        ? Number(this.$parent.$attrs.id)
        : Number(this.$route.params.id);
    },
    createView() {
      return !this.id;
    },
    entity: {
      get: function () {
        return { ...this.localEntity, ...this.entityPatch };
      },
    },
  },
  methods: {
    ...mapActions("alerts", ["pushAlert"]),
    async createEntity() {
      this.loading = true;
      let uploadedData;
      if (this.formData) {
        uploadedData = new FormData();
        Object.keys(this.entityPatch).forEach((key) => {
          uploadedData.append(key, this.entity[key]);
        });
      } else {
        uploadedData = this.entityPatch;
      }
      try {
        const { data } = await this.$store.dispatch(
          `${this.namespace}/createEntity`,
          uploadedData
        );
        if (this.modal) {
          this.$parent.$emit("create", data);
        } else {
          this.$router.push({ name: `${capitalize(this.namespace)}List` });
        }
      } catch (e) {
        this.pushAlert({
          type: "error",
          content: e || "Произошла техническая ошибка",
        });
      } finally {
        this.loading = false;
      }
    },
    async getEntity() {
      this.loading = true;
      this.localEntity = await this.$store.dispatch(
        `${this.namespace}/getEntity`,
        this.id
      );
      this.loading = false;
    },
    async updateEntity() {
      this.loading = true;
      this.localEntity = await this.$store
        .dispatch(`${this.namespace}/updateEntity`, {
          id: this.id,
          ...this.entityPatch,
        })
        .finally(() => {
          this.loading = false;
        });
      this.entityPatch = {};
      this.loading = false;
      if (this.modal) {
        this.$parent.$emit("update", { ...this.localEntity });
      }
    },
    async deleteEntity() {
      this.$store.dispatch(`${this.namespace}/deleteEntity`, this.id);
      if (this.modal) {
        this.$parent.$emit("delete");
        this.$parent.$emit("update", { ...this.localEntity });
      } else {
        this.$router.push({ name: `${capitalize(this.namespace)}List` });
      }
    },
    setValue(prop, value) {
      this.$set(this.entityPatch, prop, value);
    },
    removeValue(prop) {
      this.$delete(this.entityPatch, prop);
    },
  },
  async beforeMount() {
    if (!this.createView && this.id && this.id !== null) {
      await this.getEntity();
    }
  },
};
</script>
<style lang="scss">
.modal-detail {
  .v-card__text {
    padding: 16px !important;
  }
}
</style>
