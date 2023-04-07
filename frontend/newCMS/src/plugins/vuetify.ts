import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";
import { VDataTable } from "vuetify/labs/components";
import { VTextField } from "vuetify/components";

export const defaultDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#096ed1",
  },
};

export default createVuetify({
  defaults: {
    VTextField: {
      variant: 'outlined',
    },
  },
  components: { VDataTable, VTextField },
  theme: {
    defaultTheme: "defaultDarkTheme",
    themes: {
      defaultDarkTheme,
    },
  },
});
