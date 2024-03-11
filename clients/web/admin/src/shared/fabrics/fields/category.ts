import { IFormField, IOptionsFieldsFabric, IPage } from "@/shared/types";
import * as yup from "yup";
import { ref, markRaw } from "vue";
import RelationAutocomplete from '@/shared/components/RelationAutocomplete.vue'
import JSONEditor from '@/shared/components/JSONEditor.vue'
import RelationsTree from '@/shared/components/RelationsTree.vue'
import RelationsTable from "@/shared/components/RelationsTable.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?: IOptionsFieldsFabric<IPage>) {
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
      key: "order",
      props: {
        autocomplete: "order",
        label: "Приоритет",
        name: "order",
        type: "number",
      },
    },
    {
      component: markRaw(RelationAutocomplete),
      key: "parent_id",
      props: {
        autocomplete: "parent_id",
        label: "Родительская категория",
        name: "parent_id",
        itemValue: "id",
        itemTitle: "title",
        moduleKey: "category",
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
        moduleKey: "category",
        itemTitle: 'title',
        showActions: true,
      },
    });

    fields.value.push({
      component: markRaw(RelationsTable),
      key: "products",
      props: {
        initialValues: { category_id: options.entity.id },
        relationKey: "category_id",
        moduleKey: "product",
        itemTitle: 'title',
        showActions: true,
      },
    });

  }



  return fields.value;
}
