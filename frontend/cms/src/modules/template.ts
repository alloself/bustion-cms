import { ref } from "vue";

const key = "template";

const title = "Шаблоны";

const icon = "mdi-code-greater-than-or-equal";

const headers = ref([
  {
    title: "Заголовок",
    value: "name",
  }
]);

export { key, title, icon, headers };
