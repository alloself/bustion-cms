import { ref } from "vue";

const key = "product";

const title = "Блюда";

const icon = "mdi-file";

const headers = ref([
  {
    title: "Заголовок",
    key: "title",
  },
]);

const list = true;

export { key, title, icon, headers, list };

