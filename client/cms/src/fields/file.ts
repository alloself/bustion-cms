import { IFormField } from "./index";
import { ref, Ref } from "vue";


export default function (options?: {
  entity?: Record<string, unknown>;
  predefinedValues?: Record<string, unknown>;
}): Ref<IFormField[]> {
  const fields = ref<IFormField[]>([
    {
      component: "img",
      key: "name",
      props: {
        loading: "lazy",
        src: options?.entity?.path,
      },
    },
  ]);

  return fields;
}
