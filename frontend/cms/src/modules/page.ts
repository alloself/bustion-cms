import { ref } from "vue";

const key = "page";

const title = "Страницы";

const icon = "mdi-file";

const headers = ref([
  {
    title: "Заголовок",
    value: "title",
  },
  {
    title: "Ссылка",
    value: "slug",
  },
]);

export { key, title, icon, headers };
