import { ref } from "vue";

const key = "role";

const title = "Роли";

const icon = "mdi-key-chain";

const headers = ref([
  {
    title: "Название",
    key: "name",
  }
]);

const list = false;

export { key, title, icon, headers, list };

