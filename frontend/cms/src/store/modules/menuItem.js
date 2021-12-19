import { createVuexCRUDModule } from "@/utils";

export const menuItem = createVuexCRUDModule("menuItem", {
  url: "menu-item",
});
