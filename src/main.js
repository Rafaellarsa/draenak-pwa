import Vue from "vue";
import App from "@/App";
import wb from "@/registerServiceWorker";
import vuetify from "@/plugins/vuetify";
import "@babel/polyfill";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCOodVg7dmnSevaeX7GTwZr2uYLsnkKZ7o",
  authDomain: "draenakpwa.firebaseapp.com",
  projectId: "draenakpwa",
  storageBucket: "draenakpwa.appspot.com",
  messagingSenderId: "957916748756",
  appId: "1:957916748756:web:4f187c1408ff0bb63e1441",
  measurementId: "G-7EMHNYQKP1"
};

firebase.initializeApp(firebaseConfig);

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
