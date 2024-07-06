import { ref } from "vue";

const key = "data-collection-item";

const title = "Элементы";

const icon = "mdi-format-list-group";

const headers = ref([
  {
    title: "Назавние",
    key: "name",
  },
]);

const list = false;

export { key, title, icon, headers, list };

