
import { ref, markRaw } from "vue";
import * as yup from "yup";
import RelationsTree from '@/shared/components/RelationsTree.vue'
import { IFormField, IMenu, IOptionsFieldsFabric } from "@/shared/types";

export default function (options?: IOptionsFieldsFabric<IMenu>): IFormField[] {
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
  ]);

  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(RelationsTree),
      key: "items",
      props: {
        initialValues: { menu_id: options.entity.id },
        relationKey: 'menu_id',
        moduleKey: "menu-item",
        itemTitle: "title",
      },
    });
  }


  return fields.value;
}
