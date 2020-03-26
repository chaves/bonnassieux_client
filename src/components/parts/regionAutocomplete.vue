<template>
  <v-card>
    <v-card-title>Regions</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model="values"
        :items="regions"
        item-text="name"
        item-value="id"
        :search-input.sync="search"
        dense
        chips
        small-chips
        background-color="backSearchVille"
      ></v-autocomplete>

      <!-- villes séléctionnée -->
      <div class="region_selected">
        <v-chip v-if="region_selected"
            class="mr-2"
            color="#b1040e"
            dark
            @click="saveregion()"
          >
            <v-icon left>save</v-icon>
            {{region_selected.name}}
        </v-chip>
      </div>

      <!-- lite des items séléctionnés -->
      <items-list :type="'region'" :source_id="source_id" :list="regions_list" />

    </v-card-text>
  </v-card>
</template>

<script>
import itemsList from "./itemsList";

export default {
  props: ["source_id", "regions_source"],
  components: {
    'items-list': itemsList,
  },

  data: function () {
    return {
      regions: [],
      values: null,
      isLoading: false,
      search: null,
      regions_list: this.regions_source
    }
  },
  computed: {
    region_selected() {
      if (this.values !== null) {
        const selected = this.regions.filter(x => x.id == this.values);
        if (selected.length > 0) {
          return selected[0]
        }
      }
      return false;
    }
  },
  methods: {
    saveregion() {
      window.axios
        .post('sources/region/store', {'region_id': this.region_selected.id, 'source_id':this.source_id})
        .then(() => {
          this.regions_list = this.regions_list.concat({'id': this.region_selected.id, 'name': this.region_selected.name});
          this.values = [];
        })
        .catch(err => {
          console.log(err)
        })
    },
    remove(id, region_id) {
      window.axios
        .post('sources/region/remove', {'region_id': region_id, 'source_id':this.source_id})
        .then(() => {
          this.$delete(this.regions_list, id);
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    search (val) {

      // Items have already been loaded
      if (this.regions.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      // au moins deux carctères
      if (val.length < 2) return

      this.isLoading = true
      // Lazily load input items
      fetch(process.env.VUE_APP_API_URL+ 'regions/search/' + val)
        .then(res => res.json())
        .then(res => {
          this.regions = res;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>