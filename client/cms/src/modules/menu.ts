import { ref } from "vue";

const key = "menu";

const title = "Меню";

const icon = "mdi-menu-open";

const headers = ref([
  {
    title: "Заголовок",
    key: "name",
  }
]);

const list = true;

export { key, title, icon, headers, list };
