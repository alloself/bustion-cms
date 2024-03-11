
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { ThemeDefinition, createVuetify } from 'vuetify'
import { VTextField, VCheckbox, VFileInput, VTextarea, VDataTable, VDataTableServer } from "vuetify/components";

export const defaultDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#096ed1",
  },
};

export default createVuetify({
  defaults: {
    VTextField: {
      variant: "solo-filled",
    },
    VAutocomplete: {
      variant: "solo-filled",
    },
    VFileInput: {
      variant: "solo-filled",
    },
    VDataTable: {
      itemsPerPageOptions: [
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' }
      ]
    },
    VDataTableServer: {
      itemsPerPageOptions: [
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' }
      ]
    }
  },
  components: {
    VDataTable,
    VTextField,
    VCheckbox,
    VFileInput,
    VDataTableServer,
    VTextarea
  },
  theme: {
    defaultTheme: "defaultDarkTheme",
    themes: {
      defaultDarkTheme,
    },
  },
})
