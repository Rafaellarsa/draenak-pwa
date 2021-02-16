import Vue from "vue";
import App from "./App.vue";
import wb from "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "./registerServiceWorker";
import router from "@/router";

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
