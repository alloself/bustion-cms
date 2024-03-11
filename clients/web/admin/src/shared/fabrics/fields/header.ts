
import { ref, markRaw } from "vue";
import * as yup from "yup";
import RelationAutocomplete from "@/shared/components/RelationAutocomplete.vue";
import { IFormField, IHeader, IOptionsFieldsFabric } from "@/shared/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?:IOptionsFieldsFabric<IHeader>): IFormField[] {
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
      key: "menu_id",
      props: {
        autocomplete: "menu_id",
        label: "Меню",
        name: "menu_id",
        itemValue: "id",
        itemTitle: "name",
        moduleKey: "menu",
      },
    },
  ]);

  return fields.value;
}
