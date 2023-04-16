import { ref } from "vue";

const key = "page";

const title = "Страницы";

const icon = "mdi-file";

const headers = ref([
  {
    title: "Заголовок",
    key: "title",
  },
  {
    title: "Ссылка",
    key: "slug",
  },
]);

const list = true;

export { key, title, icon, headers, list };

