<template>
  <v-card outlined rounded="0" flat class="h-100 d-flex flex-column overflow-auto w-100" :loading="loading">
    <v-card-text>
      <smart-form
        :fields="module.fields"
        v-if="initalValues || !modelId"
      ></smart-form>
      <v-spacer></v-spacer>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="warning" @click="onReset" :loading="loading"
        >Сбросить</v-btn
      >
      <template v-if="modelId">
        <v-btn color="primary" @click="onUpdate" :loading="loading"
          >Обновить</v-btn
        >
        <v-btn color="red" @click="onDelete" :loading="loading">Удалить</v-btn>
      </template>
      <template v-else>
        <v-btn color="primary" @click="onCreate" :loading="loading"
          >Создать</v-btn
        >
      </template>
      <template v-if="modal">
        <v-btn color="primary" @click="onClose" :loading="loading"
          >Закрыть</v-btn
        >
      </template>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { client } from "@/plugins/axios";
import { useModuleStore } from "@/stores/module";
import { getChangedFormFields, getModuleKeyByRoute } from "@/utils";
import { FormContext } from "vee-validate";
import { computed, defineAsyncComponent, onMounted, provide, ref } from "vue";
import { useRoute } from "vue-router";
const SmartForm = defineAsyncComponent(
  () => import("@/components/SmartForm.vue")
);
const moduleStore = useModuleStore();

const props = withDefaults(
  defineProps<{ id?: string; module?: string; modal?: boolean }>(),
  {
    modal: false,
  }
);

const emits = defineEmits(["onClose", "onCreate"]);

const module = computed(() =>
  props.modal && props.module
    ? moduleStore.modules[props.module]
    : moduleStore.modules[getModuleKeyByRoute()]
);
const route = useRoute();
const form = ref<FormContext>();
const initalValues = ref();
const loading = ref(false);

const modelId = computed(() =>
  props.modal && props.module ? props.id : route.params.id
);

const onCreate = async () => {
  const validateRezult = await form.value?.validate();

  if (validateRezult?.valid) {
    loading.value = true;

    try {
      const { data } = await client.post(
        `/api/cms/${module.value.key}`,
        form.value?.values
      );

      if (props.modal) {
        emits("onCreate", data);
      }

      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
};

const onUpdate = async () => {
  const validateRezult = await form.value?.validate();

  if (validateRezult?.valid) {
    loading.value = true;
    try {
      const { data } = await client.patch(
        `/api/cms/${module.value.key}/${modelId.value}`,
        getChangedFormFields(initalValues.value, form.value?.values)
      );

      form.value?.resetForm({ values: data });
      initalValues.value = data;
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
};

const onDelete = () => {};

const onReset = () => {
  form.value?.resetForm();
};

const onClose = () => {
  emits("onClose");
};

onMounted(async () => {
  if (modelId.value) {
    loading.value = true;
    try {
      const { data } = await client.get(
        `/api/cms/${module.value.key}/${modelId.value}`
      );
      initalValues.value = data;
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
});

provide("form", form);
provide("loading", loading);
provide("initalValues", initalValues);
</script>
