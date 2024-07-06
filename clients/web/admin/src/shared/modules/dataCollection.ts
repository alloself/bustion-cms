import { ref } from "vue";

const key = "data-collection";

const title = "Коллекции";

const icon = "mdi-database";

const headers = ref([
  {
    title: "Назавние",
    key: "name",
  },
]);

const list = true;

export { key, title, icon, headers, list };

