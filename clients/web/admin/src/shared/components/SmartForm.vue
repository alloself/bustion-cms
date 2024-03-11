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
import { IFormField, ISmartFormProps } from "@/shared/types";
import * as yup from "yup";
import { configure } from "vee-validate";


import { set } from "lodash";

const form = inject<Ref<FormContext | undefined>>("form", ref());

configure({
  validateOnBlur: false,
});

const {
  fields = [],
  loading = false,
  initialValues = {},
} = defineProps<ISmartFormProps>();

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
  const rules = fields.reduce((acc, item) => {
    const key = typeof item.key === "function" ? item.key() : item.key;
    if (item.rule) {
      if (key.includes(".")) {
        const arrayOfKeys = key.split(".");
        const nestedObject = {};
        const nestedObjectKey = arrayOfKeys[0];
        arrayOfKeys.shift();

        set(nestedObject, arrayOfKeys.join("."), item.rule);
        acc[nestedObjectKey] = yup.object().shape(nestedObject);
      } else {
        acc[key] = item.rule as yup.ISchema<any> | yup.Reference;
      }
    }
    return acc;
  }, {} as yup.ObjectShape);

  return yup.object(rules);
});

if (!form.value) {
  form.value = useForm({
    validationSchema,
    initialValues,
    keepValuesOnUnmount: true,
  });
}
</script>
