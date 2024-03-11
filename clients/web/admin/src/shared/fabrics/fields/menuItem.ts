
import { ref, markRaw } from "vue";
import * as yup from "yup";
import RelationsTree from '@/shared/components/RelationsTree.vue'
import RelationAutocomplete from "@/shared/components/RelationAutocomplete.vue";
import { IFormField, IMenuItem, IOptionsFieldsFabric } from "@/shared/types";
import JSONEditor from '@/shared/components/JSONEditor.vue'

export default function (options?:IOptionsFieldsFabric<IMenuItem>): IFormField[] {
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
    {
      component: markRaw(JSONEditor),
      key: "attributes",
      props: {
        title: "Атрибуты",
      },
    },
  ]);

  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(RelationsTree),
      key: "menuItems",
      props: {
        initialValues: { parent_id: options.entity.id },
        moduleKey: "menu-item",
        relationKey: 'parent_id',
        itemTitle: "title",
      },
    });
  }

  if (options?.initialValues?.menu_id) {
    fields.value.push({
      component: markRaw(RelationAutocomplete),
      key: "menu_id",
      props: {
        autocomplete: "menu_id",
        label: "Меню",
        name: "menu_id",
        itemValue: "id",
        itemTitle: "name",
        moduleKey: "menu",
        readonly: Boolean(options?.initialValues?.menu_id),
      },
    });
  }

  return fields.value;
}
