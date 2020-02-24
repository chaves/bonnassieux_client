<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table 
      :headers="headers" 
      :items="sources" 
      :search="search" 
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [50,100,200,-1]
      }"
      show-expand
      dense
      must-sort
    >
    <template #item.source="{item}">
      <highlight-source
        :source="item.source"
        :industries="industries"
      />
    </template>

    <template v-slot:item.validated="{ item }">
      <div class="text-center">
        <v-checkbox 
          v-model="item.validated" 
          v-ripple="{class: 'red--text'}"
          v-on:change="updateValidateSource(item.id, item.validated)"
        >
        </v-checkbox>
      </div>
    </template>

    <template #expanded-item="{headers, item}">
      <td :colspan="headers.length">
        <v-row>
          <v-col cols="12" md="3">
            <v-textarea 
              slot="input" 
              v-model="item.source"
              v-on:change="updateSourceText(item.id, item.source)"
              dense 
              filled
              rows="3"
              auto-grow>
            </v-textarea>
            <domains-list
              :source="item.source"
              :industries="industries"
            />
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="text-center villes">Localization/cities</h3>
            <city-autocomplete :source_id="item.id" :cities_source="item.cities" />
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="text-center">Industries</h3>
            <domain-select :source_id="item.id" :domains="domains" :domains_source="item.domains" />
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="text-center">Actors</h3>
          </v-col>
        </v-row>

      </td>
    </template>

    </v-data-table>
  </v-card>
</template>

<script>
import highlightSource from "./parts/highlightSource";
import domainsList from "./parts/domainsList";
import cityAutocomplete from "./parts/cityAutocomplete";
import domainSelect from "./parts/domainSelect";

export default {
  props: ["sources", "industries", "domains"],
  data: () => ({
    search: '',
    pagination: {}
  }),
  components: {
    "highlight-source": highlightSource,
    "domains-list": domainsList,
    "city-autocomplete": cityAutocomplete,
    "domain-select": domainSelect
  },
  computed: {
    headers() {
      return [
        { text: "id", sortable: false, value: "id" },
        { text: "Date", sortable: true, value: "date", width: "110px" },
        { text: "Source", sortable: false, value: "source" },
        { text: "Validated", sortable: false, value: "validated" }
      ]
    }
  },
  methods: {
    updateSourceText(id, source) {
      window.axios
        .post(`sources/${id}/update`, {'source':source})
        .then()
        .catch();
    },
    updateValidateSource(id, validated) {
      window.axios
        .post(`sources/${id}/validate`, {'validated':validated})
        .then()
        .catch();
    }
  }
};
</script>

<style scoped>

</style>