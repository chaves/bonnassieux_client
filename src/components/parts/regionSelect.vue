<template>
  <v-card>
    <v-card-title>Regions</v-card-title>
    <v-card-text>
      <v-select
        v-model="value"
        :items="regions"
        item-text="name"
        item-value="id"
        dense
        chips
        small-chips
      ></v-select>

      <!-- regiones séléctionnés -->
      <div class="region_selected">
        <v-chip v-if="region_selected"
            class="mr-2"
            color="#b1040e"
            dark
            @click="saveregion()"
          >
            <v-icon left>save</v-icon>
            {{region_selected.name}}
        </v-chip>
      </div>

      <!-- lite des villes séléctionnées -->
      <div class="regions_list">
        <v-chip 
          v-for="region in regions_list" 
          :key="region.id" 
          class="ma-2"
          color="#616161"
          dark
        >
          {{ region.name }}
        </v-chip>
      </div>

    </v-card-text>
  </v-card> 
</template>


<script>
export default {
  props: ["source_id", "regions_source", "regions"],
  data: function () {
    return {
      regions_list: this.regions_source,
      value: []
    }
  },
  computed: {
    region_selected() {
      if(typeof this.value === 'number') {
        const selected = this.regions.filter(x => x.id == this.value);
        if (selected.length > 0) {
          return selected[0]
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    saveregion() {
      window.axios
        .post('sources/region/store', {'region_id': this.region_selected.id, 'source_id':this.source_id})
        .then(() => {
          this.regions_list = this.regions_list.concat({'id': this.region_selected.id, 'name': this.region_selected.name});
          this.value = [];
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
