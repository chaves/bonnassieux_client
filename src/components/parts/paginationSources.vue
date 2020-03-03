<template>
  <v-layout justify-center>
    <v-flex>
      <v-card>
        <v-card-text>
          <v-pagination
            v-model="pageEnCours"
            :length="pagination.last_page"
            :update="$emit('newPage', pageEnCours)"
            :total-visible="12"
          ></v-pagination>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["pagination", "page"],
  data: () => ({
    pageEnCours: 1
  }),
  mounted() {
    this.pageEnCours = this.page;
  }
};
</script>

<style>
</style>
