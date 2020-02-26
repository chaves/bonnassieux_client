<template>
  <v-card-text>
    <v-autocomplete
      v-model="values"
      :items="matters"
      item-text="name"
      item-value="id"
      :search-input.sync="search"
      cache-items
      dense
      chips
      small-chips
      background-color="backSearchVille"
    ></v-autocomplete>

    <!-- villes séléctionnée -->
    <div class="selected_matter">
      <v-chip v-if="matter_selected"
          class="mr-2"
          color="#b1040e"
          dark
          @click="savematter()"
        >
          <v-icon left>save</v-icon>
          {{matter_selected.name}}
      </v-chip>
    </div>

    <!-- lite des villes séléctionnées -->
    <div class="matters_list">
      <v-chip 
        v-for="matter in matters_list" 
        :key="matter.id" 
        class="ma-2"
        color="#546E7A"
        dark
      >
        {{ matter.name }}
      </v-chip>
    </div>

  </v-card-text>
</template>

<script>
export default {
  props: ["source_id", "matters_source"],

  data: function () {
    return {
      matters: [],
      values: null,
      isLoading: false,
      search: null,
      matters_list: this.matters_source
    }
  },
  computed: {
    matter_selected() {
      if (this.values !== null) {
        const selected = this.matters.filter(x => x.id == this.values);
        if (selected.length > 0) {
          return selected[0]
        }
      }
      return false;
    }
  },
  methods: {
    savematter() {
      window.axios
        .post('sources/matter/store', {'matter_id': this.matter_selected.id, 'source_id':this.source_id})
        .then(() => {
          this.matters_list = this.matters_list.concat({'id': this.matter_selected.id, 'name': this.matter_selected.name});
          this.values = null;
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    search (val) {

      // Items have already been loaded
      if (this.matters.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      // au moins deux carctères
      if (val.length < 2) return

      this.isLoading = true
      // Lazily load input items
      fetch('http://bonnassieux_serveur.test/api/matters')
        .then(res => res.json())
        .then(res => {
          this.matters = res;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>