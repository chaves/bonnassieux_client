import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import SourceListe from "@/components/SourceListe";
import SourceListeValidated from "@/components/SourceListeValidated";
import Dictionary from "@/components/Dictionary";

const routes = [
  {
    path: "/",
    component: SourceListe
  },
  {
    path: "/valides",
    component: SourceListeValidated
  },
  {
    path: "/cities",
    component: Dictionary,
    props: { url: "cities" }
  },
  {
    path: "/domains",
    component: Dictionary,
    props: { url: "domains" }
  },
  {
    path: "/persons",
    component: Dictionary,
    props: { url: "persons" }
  },
  {
    path: "/groups",
    component: Dictionary,
    props: { url: "groups" }
  },
  {
    path: "/cases",
    component: Dictionary,
    props: { url: "matters" }
  }
];

const router = new VueRouter({
  routes, // short for `routes: routes`,
  hashbang: false,
  mode: "history"
});

export default router;
