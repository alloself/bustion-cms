import { ref } from "vue";

const key = "page";

const title = "Страницы";

const icon = "mdi-file";

const headers = ref([
  {
    title: "Заголовок",
    key: "link.title",
  },
  {
    title: "Ссылка",
    key: "link.path",
  },
  {
    title: "Язык",
    key: "language.title",
  },
]);

const list = true;

export { key, title, icon, headers, list };

