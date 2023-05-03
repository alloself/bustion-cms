import { ref } from "vue";

const key = "data-object";

const title = "Объекты данных";

const icon = "mdi-database";

const headers = ref([
  {
    title: "Заголовок",
    key: "title",
  },
]);

const list = true;

export { key, title, icon, headers, list };
