import { ref } from "vue";

const key = "header";

const title = "Подвалы сайта";

const icon = "mdi-page-layout-header";

const headers = ref([
  {
    title: "Заголовок",
    key: "name",
  }
]);

export { key, title, icon, headers };
