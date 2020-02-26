<template>
  <div>
    <v-text-field
      v-model="ref"
      single-line
      v-on:change="updateRefId(ref)"
    ></v-text-field>
  </div>

</template>

<script>
export default {
    props: ["source_id", "ref_id"],
      data: function () {
    return {
      ref: this.ref_id
    }
  },
    methods: {
    updateRefId(ref) {
      window.axios
        .post(`sources/ref_id/${this.source_id}/update`, {'ref_id': ref})
        .then()
        .catch();
    }
  },
}
</script>