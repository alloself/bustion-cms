import { ref } from "vue";

const key = "category";

const title = "Категории";

const icon = "mdi-file";

const headers = ref([
  {
    title: "Заголовок",
    key: "title",
  },
  {
    title: "Приоритет",
    key: "order",
  },
]);

const list = true;

export { key, title, icon, headers, list };

 