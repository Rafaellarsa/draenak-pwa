import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import pt from "vuetify/lib/locale/pt";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: "pt"
  },
  theme: {
    themes: {
      light: {
        primary: "#5915C7",
        secondary: "#209898"
      }
    }
  }
});
