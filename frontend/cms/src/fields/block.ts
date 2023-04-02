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
      component: "v-text-field",
      key: "slug",
      props: {
        autocomplete: "slug",
        label: "Ключ",
        name: "slug",
        type: "text",
      },
      rule: yup.string().required(),
    },
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
      key: "link",
      props: {
        autocomplete: "link",
        label: "Ссылка",
        name: "link",
        type: "text",
      },
      rule: yup.string(),
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
      key: "page_id",
      props: {
        autocomplete: "page_id",
        label: "Страница",
        name: "page_id",
        itemValue: "id",
        itemTitle: "title",
        module: "page",
        readonly: Boolean(options?.predefinedValues?.page_id),
      },
    },
    {
      component: markRaw(WYSIWYGEditor),
      key: "content",
    },
  ]);

  return fields;
}
