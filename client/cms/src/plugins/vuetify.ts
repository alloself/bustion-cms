import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";
import { VDataTable, VDataTableServer } from "vuetify/labs/components";
import { VTextField, VCheckbox, VFileInput } from "vuetify/components";

export const defaultDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#096ed1",
  },
};

export default createVuetify({
  defaults: {
    VTextField: {
      variant: "outlined",
    },
    VAutocomplete: {
      variant: "outlined",
    },
    VFileInput: {
      variant: "outlined",
    },
  },
  components: {
    VDataTable,
    VTextField,
    VCheckbox,
    VFileInput,
    VDataTableServer,
  },
  theme: {
    defaultTheme: "defaultDarkTheme",
    themes: {
      defaultDarkTheme,
    },
  },
});
