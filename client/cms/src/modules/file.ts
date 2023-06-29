import { ref } from "vue";

const key = "file";

const title = "Файлы";

const icon = "mdi-file";

const headers = ref([
  {
    title: "Название",
    key: "name",
  },
]);

const list = true;

export { key, title, icon, headers, list };
