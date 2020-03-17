import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import SourceListe from "@/components/SourceListe";
import Dictionary from "@/components/Dictionary";

const routes = [
  {
    path: "/",
    component: SourceListe,
    props: { url: "sources" }
  },
  {
    path: "/valides",
    component: SourceListe,
    props: { url: "sources/validated" }
  },
  {
    path: "/cities",
    component: Dictionary,
    props: { url: "cities" }
  },
  {
    path: "/regions",
    component: Dictionary,
    props: { url: "regions" }
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
  }
];

const router = new VueRouter({
  routes, // short for `routes: routes`,
  hashbang: false,
  mode: "history"
});

export default router;
