<template>
  <span v-html="highlight(source, industries, cities, regions, persons)"></span>
</template>

<script>
export default {
  props: ["source", "industries", "cities", "regions", "persons"],
  methods: {
    highlight: function(source, industries, cities, regions, persons) {

      industries.map(function(value) {
        const regex = RegExp('(\\b'+ value.name +'[s]?\\b)', "igm");
        source = source.replace(
          regex,
          match => {
            return (
              '<span style="background-color: #FFFF00">' + match + '</span>'
            );
          }
        );
      });

      cities.map(function(value) {
        const regex = RegExp('(\\b'+ value.name +'[s]?\\b)', "igm");
        source = source.replace(
          regex,
          match => {
            return (
              '<span style="background-color: #ffcccc">' + match + '</span>'
            );
          }
        );
      });

      regions.map(function(value) {
        const regex = RegExp('(\\b'+ value.name +'[s]?\\b)', "igm");
        source = source.replace(
          regex,
          match => {
            return (
              '<span style="background-color: #99ffbb">' + match + '</span>'
            );
          }
        );
      });

      persons.map(function(value) {
        const regex = RegExp('(\\b'+ value.name +'[s]?\\b)', "igm");
        source = source.replace(
          regex,
          match => {
            return (
              '<span style="background-color: #ccccff">' + match + '</span>'
            );
          }
        );
      });
      return source;
    }
  }
};
</script>

<style>

</style>
