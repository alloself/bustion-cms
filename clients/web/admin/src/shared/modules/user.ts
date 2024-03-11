import { IUser,IRole } from "@/shared/types";
import { ref } from "vue";

const key = "user";

const title = "Пользователи";

const icon = "mdi-account-group";

const headers = ref([
  {
    title: "Имя",
    key: "name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Роль",
    key: "roles",
    value:(user :IUser) => user.roles.map((role:IRole) => role.name).join(',')
  },
]);

const list = true;

export { key, title, icon, headers, list };

