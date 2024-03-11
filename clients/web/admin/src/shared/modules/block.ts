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
    title: "Слаг",
    key: "slug",
  },
  {
    title: "Ключ",
    key: "key",
  },
]);

const list = false;

export { key, title, icon, headers, list };

