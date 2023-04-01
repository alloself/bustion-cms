<template>
  <v-form>
    <slot
      v-for="(schemeField, index) in fields"
      :name="schemeField.key"
      :key="`${index}-${schemeField.key}`"
    >
      <Field
        :name="getFieldKey(schemeField)"
        v-slot="{ value, handleChange, errors }"
      >
        <component
          :is="schemeField.component"
          class="mb-2"
          :model-value="value"
          :loading="loading"
          @update:modelValue="handleChange"
          :error-messages="errors"
          v-bind="getFieldProps(schemeField)"
          v-on="getFieldEvents(schemeField)"
        ></component>
      </Field>
    </slot>
  </v-form>
</template>
<script lang="ts" setup>
import { computed, inject, ref, Ref } from "vue";
import { useForm, Field, FormContext } from "vee-validate";
import { IFormField } from "@/fields";
import * as yup from "yup";
import { configure } from "vee-validate";

export interface IFormProps {
  fields: IFormField[];
}

const form = inject<Ref<FormContext | undefined>>("form", ref());
const initalValues = inject("initalValues", ref({}));
const loading = inject("loading", ref(false));

configure({
  validateOnBlur: false,
});

const props = withDefaults(defineProps<IFormProps>(), {
  fields: () => [],
  onInitialized: () => {},
});

const getFieldProps = (field: IFormField) => {
  return field.props || {};
};

const getFieldEvents = (field: IFormField) => {
  return field.events || {};
};

const getFieldKey = (field: IFormField) => {
  return typeof field.key === "function" ? field.key() : field.key;
};

const validationSchema = computed(() => {
  const rules = props.fields.reduce((acc, item) => {
    const key = typeof item.key === "function" ? item.key() : item.key;
    if (item.rule) {
      acc[key] = item.rule;
    }

    return acc;
  }, {} as Record<string, unknown>);

  //@ts-ignore
  return yup.object(rules);
});

if (!form.value) {
  form.value = useForm({
    validationSchema,
    initialValues: initalValues.value,
  });
}
</script>
