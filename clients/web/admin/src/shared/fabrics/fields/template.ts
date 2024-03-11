
import { ref, markRaw } from "vue";
import * as yup from "yup";
import CodeEditor from "@/shared/components/CodeEditor.vue";
import { IFormField, IOptionsFieldsFabric, ITemplate } from "@/shared/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?: IOptionsFieldsFabric<ITemplate>): IFormField[] {
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
      component: markRaw(CodeEditor),
      key: "value",
    },
  ]);

  return fields.value;
}
