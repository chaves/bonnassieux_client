<template>
  <v-card>
    <v-card-title>Persons</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model="values"
        :items="persons"
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
      <div class="selected_person">
        <v-chip v-if="person_selected"
            class="mr-2"
            color="#b1040e"
            dark
            @click="savePerson()"
          >
            <v-icon left>save</v-icon>
            {{person_selected.name}}
        </v-chip>
      </div>

      <!-- lite des villes séléctionnées -->
      <div class="persons_list">
        <v-chip 
          v-for="person in persons_list" 
          :key="person.id" 
          class="ma-2"
          color="#616161"
          dark
        >
          {{ person.name }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["source_id", "persons_source"],

  data: function () {
    return {
      persons: [],
      values: null,
      isLoading: false,
      search: null,
      persons_list: this.persons_source
    }
  },
  computed: {
    person_selected() {
      if (this.values !== null) {
        const selected = this.persons.filter(x => x.id == this.values);
        if (selected.length > 0) {
          return selected[0]
        }
      }
      return false;
    }
  },
  methods: {
    savePerson() {
      window.axios
        .post('sources/person/store', {'person_id': this.person_selected.id, 'source_id':this.source_id})
        .then(() => {
          this.persons_list = this.persons_list.concat({'id': this.person_selected.id, 'name': this.person_selected.name});
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
      if (this.persons.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      // au moins deux carctères
      if (val.length < 2) return

      this.isLoading = true
      // Lazily load input items
      fetch('http://bonnassieux_serveur.test/api/persons')
        .then(res => res.json())
        .then(res => {
          this.persons = res;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>