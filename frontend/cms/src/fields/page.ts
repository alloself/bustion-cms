import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import RelationFieldAutocomplete from "@/components/RelationFieldAutocomplete.vue";
import BlocksTable from "@/components/BlocksTable.vue";

export default (function (): Ref<IFormField[]> {
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
      component: markRaw(RelationFieldAutocomplete),
      key: "parent_id",
      props: {
        autocomplete: "parent_id",
        label: "Родительская страница",
        name: "parent_id",
        itemValue: "id",
        module: "page",
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
        module: "template"
      },
    },
    {
      component: markRaw(BlocksTable),
      key: "blocks",
    },
  ]);

  return fields;
})();
