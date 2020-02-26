<template>
  <v-card-text>
    <v-autocomplete
      v-model="values"
      :items="groups"
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
    <div class="selected_group">
      <v-chip v-if="group_selected"
          class="mr-2"
          color="#b1040e"
          dark
          @click="savegroup()"
        >
          <v-icon left>save</v-icon>
          {{group_selected.name}}
      </v-chip>
    </div>

    <!-- lite des villes séléctionnées -->
    <div class="groups_list">
      <v-chip 
        v-for="group in groups_list" 
        :key="group.id" 
        class="ma-2"
        color="#616161"
        dark
      >
        {{ group.name }}
      </v-chip>
    </div>

  </v-card-text>
</template>

<script>
export default {
  props: ["source_id", "groups_source"],

  data: function () {
    return {
      groups: [],
      values: null,
      isLoading: false,
      search: null,
      groups_list: this.groups_source
    }
  },
  computed: {
    group_selected() {
      if (this.values !== null) {
        const selected = this.groups.filter(x => x.id == this.values);
        if (selected.length > 0) {
          return selected[0]
        }
      }
      return false;
    }
  },
  methods: {
    savegroup() {
      window.axios
        .post('sources/group/store', {'group_id': this.group_selected.id, 'source_id':this.source_id})
        .then(() => {
          this.groups_list = this.groups_list.concat({'id': this.group_selected.id, 'name': this.group_selected.name});
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
      if (this.groups.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      // au moins deux carctères
      if (val.length < 2) return

      this.isLoading = true
      // Lazily load input items
      fetch('http://bonnassieux_serveur.test/api/groups')
        .then(res => res.json())
        .then(res => {
          this.groups = res;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>