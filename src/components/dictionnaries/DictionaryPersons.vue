<template>
  <v-row>
    <v-col cols="12" md="6">
      <div>Persons</div>
      {{persons}}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    persons: [],
  }),

  mounted() {
    window.axios
      .get('persons')
      .then(response => this.persons = response.data);
  },
  methods: {

  }
}
</script>