import { IFormField, IOptionsFieldsFabric, IPage } from "@/shared/types";
import * as yup from "yup";
import { ref } from "vue";
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
      key: "key",
      props: {
        autocomplete: "key",
        label: "Ключ",
        name: "key",
        type: "text",
      },
      rule: yup.string().required(),
    },
  ]);



  return fields.value;
}
