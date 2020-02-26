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
    <v-data-table 
      :headers="headers" 
      :items="cities" 
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
  data: () => ({
    cities: [],
  }),
  computed: {
    headers() {
      return [
        { text: "Total", sortable: false, value: "sources_count" },
        { text: "Name", sortable: false, value: "name" }
      ]
    }
  },
  mounted() {
    window.axios
      .get('cities/counts')
      .then(response => this.cities = response.data);
  },
  methods: {

  }
}
</script>