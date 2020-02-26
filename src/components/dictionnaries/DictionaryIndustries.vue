<template>
  <v-row>
    <v-col cols="12" md="6">
      <div>Industries</div>
      {{domains}}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    domains: [],
  }),

  mounted() {
    window.axios
      .get('domains/counts')
      .then(response => this.domains = response.data);
  },
  methods: {

  }
}
</script>