import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1,
        secondary: colors.red.lighten4,
        chipVille: colors.blueGrey.lighten5
      },
      dark: {
        primary: colors.red.darken1,
        secondary: colors.red.lighten4,
        bars: "#b1040e",
        chipVille: colors.grey.darken4
      }
    }
  }
});
