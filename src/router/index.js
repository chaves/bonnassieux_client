import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import SourceListe from "@/components/SourceListe";
import Dictionary from "@/components/Dictionary";
import DictionaryCity from "@/components/DictionaryCity";
import CitiesMap from "@/components/CitiesMap";

const routes = [
  {
    path: "/",
    component: SourceListe,
    props: { url: "sources" },
  },
  {
    path: "/valides",
    component: SourceListe,
    props: { url: "sources/validated" },
  },
  {
    path: "/review",
    component: SourceListe,
    props: { url: "sources/review" },
  },
  {
    path: "/cities",
    component: DictionaryCity,
    props: { url: "cities" },
  },
  {
    path: "/regions",
    component: Dictionary,
    props: { url: "regions" },
  },
  {
    path: "/domains",
    component: Dictionary,
    props: { url: "domains" },
  },
  {
    path: "/persons",
    component: Dictionary,
    props: { url: "persons" },
  },
  {
    path: "/groups",
    component: Dictionary,
    props: { url: "groups" },
  },
  {
    path: "/cities-map",
    component: CitiesMap,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`,
  hashbang: false,
  mode: "hash",
});

export default router;
