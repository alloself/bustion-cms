import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import RelationsTable from "@/components/RelationsTable.vue";
import RelationFieldAutocomplete from "@/components/RelationFieldAutocomplete.vue";

export default function (options?: {
  entity?: Record<string, unknown>;
  predefinedValues?: Record<string, unknown>;
}): Ref<IFormField[]> {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "title",
      props: {
        autocomplete: "title",
        label: "Заголовок",
        name: "title",
        type: "text",
      },
      rule: yup.string().required(),
    },
    {
      component: "v-text-field",
      key: "link",
      props: {
        autocomplete: "link",
        label: "Ссылка",
        name: "link",
        type: "text",
      },
      rule: yup.string().required(),
    },
  ]);

  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(RelationsTable),
      key: "menuItems",
      props: {
        predefinedValues: { parent_id: options.entity.id },
        module: "menu-item",
      },
    });
  }

  if (options?.predefinedValues?.menu_id) {
    fields.value.push({
      component: markRaw(RelationFieldAutocomplete),
      key: "menu_id",
      props: {
        autocomplete: "menu_id",
        label: "Меню",
        name: "menu_id",
        itemValue: "id",
        itemTitle: "name",
        module: "menu",
        readonly: Boolean(options?.predefinedValues?.menu_id),
      },
    });
  }

  return fields;
}
