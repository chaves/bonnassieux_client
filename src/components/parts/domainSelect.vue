<template>
  <v-card>
    <v-card-title>Industries</v-card-title>
    <v-card-text>
      <v-select
        v-model="value"
        :items="domains"
        item-text="name"
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
            @click="saveDomain()"
          >
            <v-icon left>save</v-icon>
            {{domain_selected.name}}
        </v-chip>
      </div>

      <!-- lite des items séléctionnés -->
      <items-list :type="'domain'" :source_id="source_id" :list="domains_list" />

    </v-card-text>
  </v-card> 
</template>


<script>
import itemsList from "./itemsList";

export default {
  props: ["source_id", "domains_source", "domains"],
  components: {
    'items-list': itemsList,
  },
  data: function () {
    return {
      domains_list: this.domains_source,
      value: []
    }
  },
  computed: {
    domain_selected() {
      if(typeof this.value === 'number') {
        const selected = this.domains.filter(x => x.id == this.value);
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
    saveDomain() {
      window.axios
        .post('sources/domain/store', {'domain_id': this.domain_selected.id, 'source_id':this.source_id})
        .then(() => {
          this.domains_list = this.domains_list.concat({'id': this.domain_selected.id, 'name': this.domain_selected.name});
          this.value = [];
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
