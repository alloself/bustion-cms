import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import WYSIWYGEditor from "@/components/WYSIWYGEditor.vue";
import RelationFieldAutocomplete from "@/components/RelationFieldAutocomplete.vue";

export default function (options?: {
  entity?: Record<string, unknown>;
  predefinedValues?: Record<string, unknown>;
}): Ref<IFormField[]> {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "key",
      props: {
        autocomplete: "key",
        label: "Ключ",
        name: "key",
        type: "text",
      },
      rule: yup.string().required(),
    },
    {
      component: "v-text-field",
      key: "title",
      props: {
        autocomplete: "title",
        label: "Название",
        name: "title",
        type: "text",
      },
      rule: yup.string().required(),
    },
  ]);

  return fields;
}
