<template>
  <div class="selected_list">
    <v-chip 
      v-for="(item, id) in list" 
      :key="id" 
      class="ma-2"
      dark
    >
      {{ item.name }} <v-icon @click="remove(id, item.id)">mdi-delete</v-icon>
    </v-chip>
  </div>
</template>

<script>
export default {

  props: ["type", "source_id", "list"],

  methods: {
    remove(id, item_id) {
      window.axios
        .delete('sources/' +this.type+ '/remove/' + item_id, { data: {'source_id':this.source_id} })
        .then(() => {
          this.$delete(this.list, id);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style>

</style>