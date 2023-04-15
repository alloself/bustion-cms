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

export { key, title, icon, headers };
