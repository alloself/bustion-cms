import { ref } from "vue";
import * as yup from "yup";

import { IFormField, ILanguage, IOptionsFieldsFabric } from "@/shared/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?:IOptionsFieldsFabric<ILanguage>): IFormField[] {
  const fields = ref<IFormField[]>([
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
  ]);

  return fields.value;
}
