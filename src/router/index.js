import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import SourceListe from "@/components/SourceListe";
import SourceListeValidated from "@/components/SourceListeValidated";
import DictionaryIndustries from "@/components/dictionnaries/DictionaryIndustries";
import DictionaryPersons from "@/components/dictionnaries/DictionaryPersons";
import DictionaryGroups from "@/components/dictionnaries/DictionaryGroups";
import DictionaryCases from "@/components/dictionnaries/DictionaryCases";

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
    path: "/industries",
    component: DictionaryIndustries
  },
  {
    path: "/persons",
    component: DictionaryPersons
  },
  {
    path: "/groups",
    component: DictionaryGroups
  },
  {
    path: "/cases",
    component: DictionaryCases
  }
];

const router = new VueRouter({
  routes, // short for `routes: routes`,
  hashbang: false,
  mode: "history"
});

export default router;
