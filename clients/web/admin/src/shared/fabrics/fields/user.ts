import { IFormField, IOptionsFieldsFabric, IPage } from "@/shared/types";
import * as yup from "yup";
import { ref, markRaw } from "vue";
import RelationsTable from "@/shared/components/RelationsTable.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options?: IOptionsFieldsFabric<IPage>) {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "name",
      props: {
        autocomplete: "name",
        label: "Имя",
        name: "title",
        type: "text",
      },
      rule: yup.string().required(),
    },
    {
      component: "v-text-field",
      key: "email",
      props: {
        autocomplete: "email",
        label: "Email",
        name: "subtitle",
        type: "text",
      },
    },
    {
      component: markRaw(RelationsTable),
      key: "roles",
      props: {
        moduleKey: "role",
        showActions: true,
      },
    }

  ]);



  return fields.value;
}
