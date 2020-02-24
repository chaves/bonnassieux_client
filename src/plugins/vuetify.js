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
        chipVille: colors.purple.lighten3,
        backSearchVille: colors.purple.lighten5
      },
      dark: {
        primary: colors.red.darken1,
        secondary: colors.red.lighten4,
        chipVille: colors.purple.darken4
      }
    }
  }
});
