import { ref } from "vue";

const key = "menu-item";

const title = "Пункты меню";

const icon = "mdi-menu-open";

const headers = ref([
  {
    title: "Заголовок",
    key: "title",
  },
]);

const list = false;

export { key, title, icon, headers, list };
