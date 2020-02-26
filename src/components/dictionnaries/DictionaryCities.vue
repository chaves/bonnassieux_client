<template>
  <v-row>
    <v-col cols="12" md="6">
      <div>Cities</div>
      {{cities}}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    cities: [],
  }),

  mounted() {
    window.axios
      .get('cities/counts')
      .then(response => this.cities = response.data);
  },
  methods: {

  }
}
</script>