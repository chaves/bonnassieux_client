<template>
  <span v-html="highlight(source, industries)"></span>
</template>

<script>
export default {
  props: ["source", "industries"],
  methods: {
    highlight: function(source, industries) {
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

      return source;
    }
  }
};
</script>

<style>

</style>
