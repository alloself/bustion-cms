import { ref } from "vue";

const key = "block";

const title = "Блоки";

const icon = "mdi-toy-brick";

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

