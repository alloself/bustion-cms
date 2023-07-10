import { ref } from "vue";

const key = "order";

const title = "Заказы";

const icon = "mdi-cart-variant";

const headers = ref([
  {
    title: "Имя",
    key: "name",
  },
  {
    title: "Почта",
    key: "email",
  },
  {
    title: "Телефон",
    key: "phone",
  },
]);

const list = true;

export { key, title, icon, headers, list };
