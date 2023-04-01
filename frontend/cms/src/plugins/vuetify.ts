import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

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
  },
  components: { ...components, ...labs },
  directives,
  theme: {
    defaultTheme: "defaultDarkTheme",
    themes: {
      defaultDarkTheme,
    },
  },
});
