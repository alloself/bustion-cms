import { IFormField, IOptionsFieldsFabric, IPage } from "@/shared/types";
import * as yup from "yup";
import { ref, markRaw } from "vue";
import RelationAutocomplete from '@/shared/components/RelationAutocomplete.vue'
import JSONEditor from '@/shared/components/JSONEditor.vue'
import RelationsTree from '@/shared/components/RelationsTree.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?: IOptionsFieldsFabric<IPage>) {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "link.title",
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
      key: "link.subtitle",
      props: {
        autocomplete: "subtitle",
        label: "Подзаголовок",
        name: "subtitle",
        type: "text",
      },
    },
    {
      component: "v-text-field",
      key: "link.path",
      props: {
        autocomplete: "path",
        label: "Ссылка",
        messages:
          "Генерируется автоматически при создании и изменении заголовка страницы,можно обновить вручную.",
        name: "path",
        type: "text",
        class: "pb-1",
      },
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
      component: markRaw(RelationAutocomplete),
      key: "header_id",
      props: {
        autocomplete: "header_id",
        label: "Шапка страницы",
        name: "header_id",
        itemValue: "id",
        itemTitle: "name",
        moduleKey: "header",
      },
    },
    {
      component: markRaw(RelationAutocomplete),
      key: "footer_id",
      props: {
        autocomplete: "footer_id",
        label: "Подвал страницы",
        name: "footer_id",
        itemValue: "id",
        itemTitle: "name",
        moduleKey: "footer",
      },
    },
    {
      component: markRaw(RelationAutocomplete),
      key: "template_id",
      props: {
        autocomplete: "template_id",
        label: "Шаблон",
        name: "template_id",
        itemValue: "id",
        itemTitle: "name",
        moduleKey: "template",
      },
    },
    {
      component: markRaw(RelationAutocomplete),
      key: "language_id",
      props: {
        autocomplete: "language_id",
        label: "Язык",
        name: "language_id",
        itemValue: "id",
        itemTitle: "title",
        moduleKey: "language",
      },
    },
    {
      component: markRaw(JSONEditor),
      key: "meta",
      props: {
        title: "Мета",
      },
    },
  ]);

  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(RelationsTree),
      key: "blocks",
      props: {
        moduleKey: "block",
        showActions: true,
      },
    });
    fields.value.push({
      component: markRaw(RelationsTree),
      key: "children",
      props: {
        itemTitle: "link.title",
        initialValues: { parent_id: options.entity.id },
        relationKey: "parent_id",
        moduleKey: "page",
      },
      events: {

      }
    });
  }



  return fields.value;
}
