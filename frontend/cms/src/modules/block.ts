import { ref } from "vue";

const key = "block";

const title = "Блоки";

const icon = "mdi-toy-brick";

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
