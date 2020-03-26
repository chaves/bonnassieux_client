<template>
  <v-card>
    <v-card-title>Groups</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model="values"
        :items="groups"
        item-text="name"
        item-value="id"
        :search-input.sync="search"
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

      <!-- lite des items séléctionnés -->
      <items-list :type="'group'" :source_id="source_id" :list="groups_list" />

    </v-card-text>
  </v-card>
</template>

<script>
import itemsList from "./itemsList";

export default {
  props: ["source_id", "groups_source"],

  components: {
    'items-list': itemsList,
  },

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
      fetch(process.env.VUE_APP_API_URL+ 'groups/search/' + val)
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