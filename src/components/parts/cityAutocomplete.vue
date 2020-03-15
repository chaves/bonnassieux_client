<template>
  <v-card>
    <v-card-title>Localization/cities</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model="values"
        :items="cities"
        item-text="nom"
        item-value="code"
        :search-input.sync="search"
        cache-items
        dense
        chips
        small-chips
        background-color="backSearchVille"
      ></v-autocomplete>

      <!-- villes séléctionnée -->
      <div class="selected_city">
        <v-chip v-if="city_selected"
            class="mr-2"
            color="#b1040e"
            dark
            @click="saveCity()"
          >
            <v-icon left>save</v-icon>
            {{city_selected.nom}} | {{ departement }} | {{ region }}
        </v-chip>
      </div>

      <!-- lite des items séléctionnés -->
      <items-list :type="'city'" :source_id="source_id" :list="cities_list" />

    </v-card-text>
  </v-card>
</template>

<script>
import itemsList from "./itemsList";

export default {
  props: ["source_id", "cities_source"],

  data: function () {
    return {
      cities: [],
      values: null,
      isLoading: false,
      search: null,
      cities_list: this.cities_source,
      departements: [{"code":"01","nom":"Ain"},{"code":"02","nom":"Aisne"},{"code":"03","nom":"Allier"},{"code":"04","nom":"Alpes-de-Haute-Provence"},{"code":"05","nom":"Hautes-Alpes"},{"code":"06","nom":"Alpes-Maritimes"},{"code":"07","nom":"Ardèche"},{"code":"08","nom":"Ardennes"},{"code":"09","nom":"Ariège"},{"code":"10","nom":"Aube"},{"code":"11","nom":"Aude"},{"code":"12","nom":"Aveyron"},{"code":"13","nom":"Bouches-du-Rhône"},{"code":"14","nom":"Calvados"},{"code":"15","nom":"Cantal"},{"code":"16","nom":"Charente"},{"code":"17","nom":"Charente-Maritime"},{"code":"18","nom":"Cher"},{"code":"19","nom":"Corrèze"},{"code":"21","nom":"Côte-d'Or"},{"code":"22","nom":"Côtes-d'Armor"},{"code":"23","nom":"Creuse"},{"code":"24","nom":"Dordogne"},{"code":"25","nom":"Doubs"},{"code":"26","nom":"Drôme"},{"code":"27","nom":"Eure"},{"code":"28","nom":"Eure-et-Loir"},{"code":"29","nom":"Finistère"},{"code":"2A","nom":"Corse-du-Sud"},{"code":"2B","nom":"Haute-Corse"},{"code":"30","nom":"Gard"},{"code":"31","nom":"Haute-Garonne"},{"code":"32","nom":"Gers"},{"code":"33","nom":"Gironde"},{"code":"34","nom":"Hérault"},{"code":"35","nom":"Ille-et-Vilaine"},{"code":"36","nom":"Indre"},{"code":"37","nom":"Indre-et-Loire"},{"code":"38","nom":"Isère"},{"code":"39","nom":"Jura"},{"code":"40","nom":"Landes"},{"code":"41","nom":"Loir-et-Cher"},{"code":"42","nom":"Loire"},{"code":"43","nom":"Haute-Loire"},{"code":"44","nom":"Loire-Atlantique"},{"code":"45","nom":"Loiret"},{"code":"46","nom":"Lot"},{"code":"47","nom":"Lot-et-Garonne"},{"code":"48","nom":"Lozère"},{"code":"49","nom":"Maine-et-Loire"},{"code":"50","nom":"Manche"},{"code":"51","nom":"Marne"},{"code":"52","nom":"Haute-Marne"},{"code":"53","nom":"Mayenne"},{"code":"54","nom":"Meurthe-et-Moselle"},{"code":"55","nom":"Meuse"},{"code":"56","nom":"Morbihan"},{"code":"57","nom":"Moselle"},{"code":"58","nom":"Nièvre"},{"code":"59","nom":"Nord"},{"code":"60","nom":"Oise"},{"code":"61","nom":"Orne"},{"code":"62","nom":"Pas-de-Calais"},{"code":"63","nom":"Puy-de-Dôme"},{"code":"64","nom":"Pyrénées-Atlantiques"},{"code":"65","nom":"Hautes-Pyrénées"},{"code":"66","nom":"Pyrénées-Orientales"},{"code":"67","nom":"Bas-Rhin"},{"code":"68","nom":"Haut-Rhin"},{"code":"69","nom":"Rhône"},{"code":"70","nom":"Haute-Saône"},{"code":"71","nom":"Saône-et-Loire"},{"code":"72","nom":"Sarthe"},{"code":"73","nom":"Savoie"},{"code":"74","nom":"Haute-Savoie"},{"code":"75","nom":"Paris"},{"code":"76","nom":"Seine-Maritime"},{"code":"77","nom":"Seine-et-Marne"},{"code":"78","nom":"Yvelines"},{"code":"79","nom":"Deux-Sèvres"},{"code":"80","nom":"Somme"},{"code":"81","nom":"Tarn"},{"code":"82","nom":"Tarn-et-Garonne"},{"code":"83","nom":"Var"},{"code":"84","nom":"Vaucluse"},{"code":"85","nom":"Vendée"},{"code":"86","nom":"Vienne"},{"code":"87","nom":"Haute-Vienne"},{"code":"88","nom":"Vosges"},{"code":"89","nom":"Yonne"},{"code":"90","nom":"Territoire de Belfort"},{"code":"91","nom":"Essonne"},{"code":"92","nom":"Hauts-de-Seine"},{"code":"93","nom":"Seine-Saint-Denis"},{"code":"94","nom":"Val-de-Marne"},{"code":"95","nom":"Val-d'Oise"},{"code":"971","nom":"Guadeloupe"},{"code":"972","nom":"Martinique"},{"code":"973","nom":"Guyane"},{"code":"974","nom":"La Réunion"},{"code":"976","nom":"Mayotte"}],
      regions: [{"code":"01","nom":"Guadeloupe"},{"code":"02","nom":"Martinique"},{"code":"03","nom":"Guyane"},{"code":"04","nom":"La Réunion"},{"code":"06","nom":"Mayotte"},{"code":"11","nom":"Île-de-France"},{"code":"24","nom":"Centre-Val de Loire"},{"code":"27","nom":"Bourgogne-Franche-Comté"},{"code":"28","nom":"Normandie"},{"code":"32","nom":"Hauts-de-France"},{"code":"44","nom":"Grand Est"},{"code":"52","nom":"Pays de la Loire"},{"code":"53","nom":"Bretagne"},{"code":"75","nom":"Nouvelle-Aquitaine"},{"code":"76","nom":"Occitanie"},{"code":"84","nom":"Auvergne-Rhône-Alpes"},{"code":"93","nom":"Provence-Alpes-Côte d'Azur"},{"code":"94","nom":"Corse"}]
    }
  },
  components: {
    'items-list': itemsList,
  },
  computed: {
    city_selected() {
      if (this.values !== null) {
        const selected = this.cities.filter(x => x.code == this.values);
        if (selected.length > 0) {
          return selected[0]
        }
      }
      return false;
    },
    departement: function() {
      const selected = this.departements.filter(x => x.code == this.city_selected.codeDepartement);
      if (selected.length > 0) {
        return selected[0].nom
      }
      return false;
    },
    region: function() {
      const selected = this.regions.filter(x => x.code == this.city_selected.codeRegion);
      if (selected.length > 0) {
        return selected[0].nom
      }
      return false;
    }
  },
  methods: {
    saveCity() {
      window.axios
        .post('sources/city/store', {'city_id': this.city_selected.code, 'source_id':this.source_id})
        .then(() => {
          this.cities_list = this.cities_list.concat({'id': this.city_selected.code, 'name': this.city_selected.nom});
          this.values = null;
        })
        .catch(err => {
          console.log(err)
        })
    },
    remove(id, city_id) {
      window.axios
        .post('sources/region/remove', {'city_id': city_id, 'source_id':this.source_id})
        .then(() => {
          this.$delete(this.cities_list, id);
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    search (val) {

      // Items have already been loaded
      if (this.cities.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      // au moins deux carctères
      if (val.length < 2) return

      this.isLoading = true
      // Lazily load input items
      fetch('https://geo.api.gouv.fr/communes?nom='+val+'&boost=population')
        .then(res => res.json())
        .then(res => {
          this.cities = res;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

