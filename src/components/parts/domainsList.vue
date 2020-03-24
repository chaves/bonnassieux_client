<template>
  <ul>
    <li v-for="domain in domains" :key="domain.id">
      key : <span style="background-color: #FFFF00">{{ domain.name }}</span> - industry : <strong>{{ domain.domain.name }}</strong>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["source", "industries"],
  computed: {
      domains: function() {
      return (this.industries.filter(value => {
        const regex = RegExp('(\\b'+ value.name +'[s]?\\b)', "igm");
        return this.source.match(regex);
      }))
    }
  }
};
</script>

<style>

</style>
