import { ref } from "vue";

const key = "footer";

const title = "Подвалы сайта";

const icon = "mdi-page-layout-footer";

const headers = ref([
  {
    title: "Заголовок",
    key: "name",
  }
]);

const list = false;

export { key, title, icon, headers, list };
