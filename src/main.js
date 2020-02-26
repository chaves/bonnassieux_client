import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

window.axios = require("axios");

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

console.log(axios.defaults.baseURL);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
