<template>
  <v-card>
    <v-card-title>

        <v-btn class="mx-2" fab small dark color="#b1040e">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table 
      :headers="headers" 
      :items="datas" 
      :search="search" 
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [50,100,200,-1]
      }"
      dense
    >
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
        { text: "Total", sortable: false, value: "sources_count" },
        { text: "Name", sortable: false, value: "name" }
      ]
    }
  },
  methods: {
    fetchData () {
      window.axios
      .get(this.url + '/counts')
      .then(response => this.datas = response.data);
    }
  }
}
</script>