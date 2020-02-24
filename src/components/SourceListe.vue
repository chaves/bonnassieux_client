<template>
<v-container>
    <v-layout row wrap>
      <v-flex>
        <sources-table :sources="sources" :industries="industries" :domains="domains" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SourcesTable from "./SourcesTable";

export default {
  data: () => ({
    sources: [],
    industries: [],
    pagination: {},
    page: 1,
    panel: []
  }),
  components: {
    "sources-table": SourcesTable
  },
  mounted() {
    this.getAjax();
  },
  methods: {
    getAjax: function() {
      window.axios
        .get('sources')
        .then(response => this.sources = response.data.data);

      window.axios
        .get('industries')
        .then(response => this.industries = response.data);

      window.axios
        .get('domains')
        .then(response => this.domains = response.data);
    }
  }
}

</script>

<style>
</style>