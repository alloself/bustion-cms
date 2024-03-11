<template>
  <v-card outlined rounded="0" flat :max-height="`calc(100svh - ${mainRect.top}px)`"
    class="h-100 d-flex flex-column overflow-auto w-100" :loading="loading">
    <v-card-text>
      <smart-form :fields="fields" :initialValues="initialValues" :loading="loading"></smart-form>
    </v-card-text>
    <v-spacer></v-spacer>
    <div class="actions-wrapper">
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn v-for="(action, index) in actions" :key="index" v-bind="action.props" @click="action.action">{{
    action.title }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="router.go(-1)" v-if="!modal">Назад</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts" setup generic="T extends IModuleItem">
import { computed, onMounted, provide, ref } from "vue";
import { client } from "@/shared/api/axios";
import { useModuleStore } from "@/entities/module/store";
import { capitalize } from "lodash";

import {
  IFormField,
  IModuleDetailAction,
  IModuleDetailProps,
  IModuleItem,
} from "@/shared/types";
import SmartForm from "@/shared/components/SmartForm.vue";
import { useRoute, useRouter } from "vue-router";
import { FormContext } from "vee-validate";
import { getChangedFormFields } from "@/shared/utils";
import { useLayout } from "vuetify";

const route = useRoute();
const router = useRouter();
const moduleStore = useModuleStore();
const { mainRect } = useLayout();

const {
  modal = false,
  id = null,
  initialValues = {},
  moduleKey,
} = defineProps<IModuleDetailProps>();

const emits = defineEmits<{
  onCreate: [value: T];
  onUpdate: [value: T];
  onClose: [];
  onDelete: []
}>();

const onReset = () => { };
const onUpdate = async () => {
  const validateRezult = await form.value?.validate();

  if (validateRezult?.valid) {
    loading.value = true;

    try {
      const { data } = await client.patch(
        `/api/admin/${module.value.key}/${entityId.value}`,
        getChangedFormFields(localValues.value, form.value?.values) as object
      );

      emits("onUpdate", data);
      localValues.value = data;
      form.value?.resetForm({ values: localValues.value });
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
};
const onDelete = async () => {
  try {
    loading.value = true;
    await client.delete(
      `/api/admin/${module.value.key}/${entityId.value}`
    );

    router.push({ name: `${capitalize(module.value.key)}List` })

    if (modal) {
      emits("onDelete");
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
const onClose = () => {
  emits("onClose");
};
const onCreate = async () => {
  const validateRezult = await form.value?.validate();

  if (validateRezult?.valid) {
    loading.value = true;

    try {
      const { data } = await client.post(
        `/api/admin/${module.value.key}`,
        form.value?.values as object
      );

      if (modal) {
        emits("onCreate", { ...data, order: 0 });
      } else {
        router.push({
          name: `${capitalize(module.value.key)}Detail`,
          params: { id: data.id },
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
};

const allActions: IModuleDetailAction[] = [
  {
    title: "Сбросить",
    condition: true,
    action: onReset,
    props: {
      color: "warning",
    },
  },
  {
    title: "Обновить",
    condition: () => !!entityId.value,
    action: onUpdate,
    props: {
      color: "primary",
    },
  },
  {
    title: "Удалить",
    condition: () => !!entityId.value,
    action: onDelete,
    props: {
      color: "red",
    },
  },
  {
    title: "Создать",
    condition: () => !entityId.value,
    action: onCreate,
    props: {
      color: "primary",
    },
  },
  {
    title: "Закрыть",
    condition: () => modal,
    action: onClose,
    props: {
      color: "primary",
    },
  },
];

const loading = ref(false);
const localValues = ref(initialValues);
const form = ref<FormContext>();

const fields = ref<IFormField[]>([]);

const actions = computed<IModuleDetailAction[]>(() =>
  allActions.filter((action) => {
    return typeof action.condition === "function"
      ? action.condition()
      : action.condition;
  })
);

const entityId = computed(() => (modal ? id : route.params.id));

const module = computed(() => moduleStore.modules[moduleKey]);

onMounted(async () => {
  if (entityId.value) {
    loading.value = true;
    try {
      const { data } = await client.get(
        `/api/admin/${module.value.key}/${entityId.value}`
      );

      fields.value = module.value.getFields({
        entity: data,
        initialValues: initialValues,
      });

      localValues.value = { ...data, ...initialValues };


      form.value?.resetForm({ values: localValues.value })


    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  } else {

    fields.value = module.value.getFields({
      initialValues: initialValues,
    });

    localValues.value = { ...initialValues };


  }


});

provide("form", form);
</script>

<style lang="scss" scoped>
.actions-wrapper {
  background: rgb(var(--v-theme-surface));
  position: sticky;
  bottom: 0;
}
</style>
