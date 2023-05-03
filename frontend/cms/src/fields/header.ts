import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import RelationFieldAutocomplete from "@/components/RelationFieldAutocomplete.vue";

export default function (options?: {
  entity?: Record<string, unknown>;
  predefinedValues?: Record<string, unknown>;
}): Ref<IFormField[]> {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "name",
      props: {
        autocomplete: "name",
        label: "Название",
        name: "name",
        type: "text",
      },
      rule: yup.string().required(),
    },
    {
      component: markRaw(RelationFieldAutocomplete),
      key: "template_id",
      props: {
        autocomplete: "template_id",
        label: "Шаблон",
        name: "template_id",
        itemValue: "id",
        itemTitle: "name",
        module: "template",
      },
    },
    {
      component: markRaw(RelationFieldAutocomplete),
      key: "menu_id",
      props: {
        autocomplete: "menu_id",
        label: "Меню",
        name: "menu_id",
        itemValue: "id",
        itemTitle: "name",
        module: "menu",
      },
    },
  ]);

  return fields;
}
