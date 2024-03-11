import { ref } from "vue";

const key = "template";

const title = "Шаблоны";

const icon = "mdi-code-greater-than-or-equal";

const headers = ref([
  {
    title: "Заголовок",
    key: "name",
  }
]);

const list = true;

export { key, title, icon, headers, list };