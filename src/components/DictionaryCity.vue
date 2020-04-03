<template>
  <v-card>

    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
      ></v-text-field>
    </v-card-title>
    <v-spacer></v-spacer>

    <v-data-table 
      :headers="headers" 
      :items="datas" 
      :search="search" 
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [200,500,1000,-1]
      }"
      dense
    >
    <template v-slot:item.remove="{ item }">
      <v-icon color="red" @click="remove(item)">mdi-delete</v-icon>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["url"],
  data: function () {
    return {
      datas: [],
      search: '',
      item: '',
      rules: {
      required: value => !!value || 'Required.'
      }
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    // https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    headers() {
      return [
        { text: "Total", sortable: true, value: "sources_count" },
        { text: "Name", sortable: true, value: "name" },
        { text: 'Remove', sortable: true, value: 'remove' }
      ]
    }
  },
  methods: {
    fetchData () {
      window.axios
      .get(this.url + '/counts')
      .then(response => this.datas = response.data);
    },
    remove(item) {
      const index = this.datas.indexOf(item)
      window.axios
      .delete(this.url+ '/remove/' + item.id)
      .then(() => {
        this.datas.splice(index, 1)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>