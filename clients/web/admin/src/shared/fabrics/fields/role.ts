import { IFormField } from "@/shared/types";
import * as yup from "yup";
import { ref } from "vue";

export default function () {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "name",
      props: {
        autocomplete: "name",
        label: "Название",
        name: "title",
        type: "text",
      },
      rule: yup.string().required(),
    }
  ]);



  return fields.value;
}
