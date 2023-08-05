import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import RelationFieldAutocomplete from "@/components/RelationFieldAutocomplete.vue";
import RelationsTable from "@/components/RelationsTable.vue";
import RelationsTree from "@/components/RelationsTree.vue";
import EntityFieldJSONEditor from "@/components/EntityFieldJSONEditor.vue";

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
        //@ts-ignore
        prefix: `/${options?.entity?.language?.key}` || "",
        messages:
          "Генерируется автоматически при создании и изменении заголовка страницы,можно обновить вручную.",
        name: "path",
        type: "text",
        class: "pb-1",
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
      key: "footer_id",
      props: {
        autocomplete: "footer_id",
        label: "Подвал страницы",
        name: "footer_id",
        itemValue: "id",
        itemTitle: "name",
        module: "footer",
      },
    },
    {
      component: markRaw(RelationFieldAutocomplete),
      key: "header_id",
      props: {
        autocomplete: "header_id",
        label: "Шапка страницы",
        name: "header_id",
        itemValue: "id",
        itemTitle: "name",
        module: "header",
      },
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
      key: "language_id",
      props: {
        autocomplete: "language_id",
        label: "Язык",
        name: "language_id",
        itemValue: "id",
        itemTitle: "title",
        module: "language",
      },
    },
    {
      component: markRaw(EntityFieldJSONEditor),
      key: "meta",
      props: {
        title: "Мета",
      },
    },
    {
      component: markRaw(EntityFieldJSONEditor),
      key: "attributes",
      props: {
        title: "Атрибуты",
      },
    },
  ]);

  if (options?.entity?.id) {
    fields.value.push({
     component: markRaw(RelationsTree),
      key: "blocks",
      props: {
        predefinedValues: { page_id: options.entity.id },
        relationKey: "page_id",
        module: "block",
        showActions: true,
      },
    });
    fields.value.push({
      component: markRaw(RelationsTree),
      key: "children",
      props: {
        itemTitle: "title",
        predefinedValues: { parent_id: options.entity.id },
        relationKey: "parent_id",
        module: "page",
      },
    });
  }

  return fields;
}
