<template>
  <div class="selected_list">
    <span 
      v-for="(item, id) in list" 
      :key="id" 
      class="font-weight-black"
      style="color:#1A237E"
    >
      {{ item.name }}
      <v-icon color="#b1040e" @click="remove(id, item.id)">mdi-delete</v-icon>
    </span>
    
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