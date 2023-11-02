/**
 * Vuetify3 Plugin
 */
import { createVuetify, type VuetifyOptions } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import * as labsComponents from 'vuetify/labs/components';
import { aliases, mdi } from "vuetify/iconsets/mdi";
// Translations provided by Vuetify
// import { en } from 'vuetify/locale';

// Misc
import { loadFonts } from "@/plugins/webfontloader";

// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

await loadFonts();

const vuetifyConfig: VuetifyOptions = {
  // Global configuration
  // https://vuetifyjs.com/en/features/global-configuration/
  // Icon Fonts
  // https://vuetifyjs.com/en/features/icon-fonts/
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  },
  // // Internationalization (i18n)
  // // https://vuetifyjs.com/en/features/internationalization/#internationalization-i18n
  // locale: {
  //   locale: 'en',
  //   fallback: 'en',
  //   messages: { en },
  // },
  // Theme
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    defaultTheme: "dark"
  },
  components,
  directives
};

const vuetify = createVuetify(vuetifyConfig);
export default vuetify;
