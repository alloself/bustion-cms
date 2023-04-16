import { ref } from "vue";

const key = "header";

const title = "Шапки сайта";

const icon = "mdi-page-layout-header";

const headers = ref([
  {
    title: "Заголовок",
    key: "name",
  },
]);

const list = false;

export { key, title, icon, headers, list };
