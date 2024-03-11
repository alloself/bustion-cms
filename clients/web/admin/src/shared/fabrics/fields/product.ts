import { IFormField, IOptionsFieldsFabric, IProduct } from "@/shared/types";
import * as yup from "yup";
import { ref, markRaw } from "vue";
import RelationsWithKeyTable from "@/shared/components/RelationsWithKeyTable.vue";
import WYSIWYGEditor from "@/shared/components/WYSIWYGEditor.vue";
import FilesTable from "@/shared/components/FilesTable.vue";
import RelationAutocomplete from '@/shared/components/RelationAutocomplete.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?: IOptionsFieldsFabric<IProduct>) {

  console.log(options?.initialValues?.category_id)
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "title",
      props: {
        autocomplete: "title",
        label: "Название",
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
      rule: yup.number(),
    },
    {
      component: "v-text-field",
      key: "price",
      props: {
        autocomplete: "price",
        label: "Цена",
        name: "price",
        suffix: "₽"
      },
      rule: yup.number(),
    },
    {
      component: "v-text-field",
      key: "weight",
      props: {
        autocomplete: "weight",
        label: "Вес",
        name: "weight",
        suffix: "мл/гр"
      },
      rule: yup.number(),
    },
    {
      component: markRaw(RelationAutocomplete),
      key: "category_id",
      props: {
        autocomplete: "category_id",
        label: "Категория",
        name: "category_id",
        readonly: options?.initialValues?.category_id ? true : false,
        itemValue: "id",
        itemTitle: "title",
        moduleKey: "category",
      },
    },
    {
      component: markRaw(RelationsWithKeyTable),
      key: "attributes",
      props: {
        moduleKey: "attribute",
        showActions: false,
        itemTitle:'name'
      },
    },
    {
      component: markRaw(WYSIWYGEditor),
      key: "nutritional",
    },
    {
      component: markRaw(WYSIWYGEditor),
      key: "description",
    },
  ]);
  if (options?.entity?.id) {
    fields.value.push({
      component: markRaw(FilesTable),
      key: "images",
      props: {
        title: "Изображения",
        type: "image",
      },
    });
  }



  return fields.value;
}
