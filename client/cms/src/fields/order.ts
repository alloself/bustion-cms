import { IFormField } from "./index";
import { markRaw, ref, Ref } from "vue";
import FilesTable from "@/components/FilesTable.vue";

export default function (options?: {
  entity?: Record<string, unknown>;
  predefinedValues?: Record<string, unknown>;
}): Ref<IFormField[]> {
  const fields = ref<IFormField[]>([
    {
      component: "v-text-field",
      key: "name",
      props: {
        label: "Имя",
        readonly: true,
      },
    },
    {
      component: "v-text-field",
      key: "email",
      props: {
        label: "Почта",
        readonly: true,
      },
    },
    {
      component: "v-text-field",
      key: "phone",
      props: {
        label: "Телефон",
        readonly: true,
      },
    },
    {
      component: markRaw(FilesTable),
      key: "files",
      props: {
        title: "Файлы",
        type: "file",
      },
    },
  ]);

  return fields;
}
