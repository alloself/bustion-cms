
import { ref, markRaw } from "vue";
import * as yup from "yup";
import WYSIWYGEditor from "@/shared/components/WYSIWYGEditor.vue";
import RelationAutocomplete from '@/shared/components/RelationAutocomplete.vue'
import RelationsTree from "@/shared/components/RelationsTree.vue";
import JSONEditor from "@/shared/components/JSONEditor.vue";
import FilesTable from "@/shared/components/FilesTable.vue";
import { IBlock, IFormField, IOptionsFieldsFabric } from "@/shared/types";

export default function (options?:IOptionsFieldsFabric<IBlock>): IFormField[] {

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
      rule: yup.string(),
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
      component: markRaw(JSONEditor),
      key: "attributes",
      props: {
        title: "Атрибуты",
      },
    },
    {
      component: markRaw(WYSIWYGEditor),
      key: "content",
    },
  ]);

  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(RelationsTree),
      key: "children",
      props: {
        initialValues: { parent_id: options.entity.id },
        relationKey: "parent_id",
        moduleKey: "block",
        showActions: true,
      },
    });

    fields.value.push({
      component: markRaw(FilesTable),
      key: "images",
      props: {
        title: "Изображения",
        type: "image",
      },
    });

    fields.value.push({
      component: markRaw(FilesTable),
      key: "files",
      props: {
        title: "Файлы",
        type: "file",
      },
    });
  }
  if (options?.initialValues?.page_id) {
    fields.value.push({
      component: markRaw(RelationAutocomplete),
      key: "page_id",
      props: {
        autocomplete: "page_id",
        label: "Страница",
        name: "page_id",
        itemValue: "id",
        itemTitle: "title",
        moduleKey: "page",
        readonly: Boolean(options?.initialValues?.page_id),
      },
    });
  }

  return fields.value;
}
