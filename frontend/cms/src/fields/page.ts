import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import RelationFieldAutocomplete from "@/components/RelationFieldAutocomplete.vue";
import RelationsTable from "@/components/RelationsTable.vue";

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
      key: "subtitle",
      props: {
        autocomplete: "subtitle",
        label: "Подзаголовок",

        name: "subtitle",
        type: "text",
      },
      rule: yup.string().required(),
    },
    {
      component: "v-text-field",
      key: "path",
      props: {
        autocomplete: "path",
        label: "Ссылка",
        messages:
          "Генерируется автоматически при создании и изменении заголовка страницы,можно обновить вручную.",
        name: "path",
        type: "text",
        class: "pb-1",
      },
      rule: yup.string(),
    },
    {
      component: "v-text-field",
      key: "keywords",
      props: {
        autocomplete: "keywords",
        label: "Meta keywords",
        name: "keywords",
        type: "text",
      },
      rule: yup.string(),
    },
    {
      component: "v-text-field",
      key: "description",
      props: {
        autocomplete: "description",
        label: "Metaa description",
        name: "description",
        type: "text",
      },
      rule: yup.string(),
    },
    {
      component: "v-checkbox",
      key: "index",
      props: {
        autocomplete: "index",
        label: "Главная страница",
        name: "index",
      },
      rule: yup.boolean(),
    },
    {
      component: "v-checkbox",
      key: "show",
      props: {
        autocomplete: "show",
        label: "Показывать страницу",
        name: "show",
      },
      rule: yup.boolean(),
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
  ]);

  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(RelationsTable),
      key: "blocks",
      props: {
        predefinedValues: { page_id: options.entity.id },
        module: 'block'
      },
    });
    fields.value.push({
      component: markRaw(RelationsTable),
      key: "children",
      props: {
        predefinedValues: { parent_id: options.entity.id },
        module: 'page'
      },
    });
  }

  return fields;
}
