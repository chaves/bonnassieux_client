<template>
  <v-card-text>
    {{value}}
    <v-select
      v-model="value"
      :items="domains"
      item-text="domain"
      item-value="id"
      dense
      chips
      small-chips
    ></v-select>

    <!-- domaines séléctionnés -->
    <div class="domain_selected">
      <v-chip v-if="domain_selected"
          class="mr-2"
          color="#b1040e"
          dark
          @click="saveCity()"
        >
          <v-icon left>save</v-icon>
          {{domains_selected.domain}}
      </v-chip>
    </div>

    <!-- lite des villes séléctionnées -->
    <div class="domains_list">
      <v-chip 
        v-for="domain in domains_list" 
        :key="domain.id" 
        class="ma-2"
        color="#546E7A"
        dark
      >
        {{ domain.domain }}
      </v-chip>
    </div>

  </v-card-text>  
</template>


<script>
export default {
  props: ["source_id", "domains_source", "domains"],
  data: function () {
    return {
      domains_list: this.domains_source,
      value: null
    }
  },
  computed: {
    domain_selected() {
      if (this.value !== null) {
        const selected = this.domain.filter(x => x.id == this.value);
        if (selected.length > 0) {
          return selected[0]
        }
      }
      return false;
    },
  },
}
</script>
