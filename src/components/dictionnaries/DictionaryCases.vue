<template>
  <v-row>
    <v-col cols="12" md="6">
      <div>Cases</div>
      {{matters}}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    matters: [],
  }),

  mounted() {
    window.axios
      .get('matters')
      .then(response => this.matters = response.data);
  },
  methods: {

  }
}
</script>