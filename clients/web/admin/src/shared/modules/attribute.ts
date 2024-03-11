import { ref } from "vue";

const key = "attribute";

const title = "Аттрибуты";

const icon = "mdi-animation";

const headers = ref([
  {
    title: "Назавние",
    key: "name",
  },
  {
    title: "Ключ",
    key: "key",
  },
  {
    title: "Значение",
    key: "value",
  },
]);

const list = false;

export { key, title, icon, headers, list };

