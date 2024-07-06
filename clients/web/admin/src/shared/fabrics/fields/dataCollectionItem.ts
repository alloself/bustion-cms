import { IFormField, IOptionsFieldsFabric, IPage } from "@/shared/types";
import * as yup from "yup";
import { markRaw, ref } from "vue";
import JSONEditor from "@/shared/components/JSONEditor.vue";
import RelationsTree from "@/shared/components/RelationsTree.vue";
import RelationAutocomplete from "@/shared/components/RelationAutocomplete.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?: IOptionsFieldsFabric<IPage>) {
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
      key: "link.title",
      props: {
        autocomplete: "title",
        label: "Заголовок",
        name: "title",
        type: "text",
      },
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
      key: "children",
      props: {
        initialValues: { parent_id: options.entity.id },
        relationKey: "parent_id",
        moduleKey: "data-collection",
        showActions: true,
      },
    });
  }

  return fields.value;
}
