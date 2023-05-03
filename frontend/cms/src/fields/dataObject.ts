import { IFormField } from "./index";
import { ref, Ref, markRaw } from "vue";
import * as yup from "yup";
import EntityFieldJSONEditor from "@/components/EntityFieldJSONEditor.vue";

export default function (options?: {
  entity?: Record<string, unknown>;
  predefinedValues?: Record<string, unknown>;
}): Ref<IFormField[]> {
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
      component: markRaw(EntityFieldJSONEditor),
      key: "attributes",
      props: {
        title: "Атрибуты",
      },
    },
    {
      component: "v-file-input",
      key: "images",
      props: {
        label: "Изображения",
        name: "images",
        multiple: true,
        chips: true,
        clearable: true,
        accept: "image/png, image/jpeg, image/webp, image/avif",
      },
    },
    {
      component: "v-file-input",
      key: "files",
      props: {
        label: "Файлы",
        name: "files",
        multiple: true,
        chips: true,
        clearable: true,
      },
    },
  ]);

  return fields;
}
