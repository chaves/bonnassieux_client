<template>
  <v-row>
    <v-col cols="12" md="6">
      <div>Groups</div>
      {{groups}}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    groups: [],
  }),

  mounted() {
    window.axios
      .get('groups/counts')
      .then(response => this.groups = response.data);
  },
  methods: {

  }
}
</script>