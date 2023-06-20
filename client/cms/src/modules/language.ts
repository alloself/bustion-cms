import { ref } from "vue";

const key = "language";

const title = "Языки";

const icon = "mdi-translate";

const headers = ref([
  {
    title: "Заголовок",
    key: "title",
  },
  {
    title: "Ключ",
    key: "key",
  },
]);

const list = true;

export { key, title, icon, headers, list };
