import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import SourceListe from "@/components/SourceListe";
import SourceListeValidated from "@/components/SourceListeValidated";

const routes = [
  {
    path: "/",
    component: SourceListe
  },
  {
    path: "/valides",
    component: SourceListeValidated
  }
];

const router = new VueRouter({
  routes, // short for `routes: routes`,
  hashbang: false,
  mode: "history"
});

export default router;
