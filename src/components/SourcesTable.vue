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
          <v-col cols="12" md="6">
            <v-card>
              <v-card-text>
                      <v-textarea 
                        slot="input" 
                        v-model="item.source"
                        v-on:change="updateSourceText(item.id, item.source)"
                        dense 
                        filled
                        rows="3"
                        background-color="#FAFAFA"
                        auto-grow>
                      </v-textarea>
                      <domains-list
                        :source="item.source"
                        :industries="industries"
                      />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <city-autocomplete :source_id="item.id" :cities_source="item.cities" />
          </v-col>

          <v-col cols="12" md="3">
            <domain-select :source_id="item.id" :domains="domains" :domains_source="item.domains" />
          </v-col>

        </v-row>

        <v-row>
          
          <v-col cols="12" md="3">
            <v-card>
              <v-card-title>Reference</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="item.ref_id"
                  single-line
                  v-on:change="updateRefId(item.ref_id)"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <person-autocomplete :source_id="item.id" :persons_source="item.persons" />
          </v-col>

          <v-col cols="12" md="3">
            <group-autocomplete :source_id="item.id" :groups_source="item.groups" />
          </v-col>

          <v-col cols="12" md="3">
            <matter-autocomplete :source_id="item.id" :matters_source="item.matters" />
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
import personAutocomplete from "./parts/personAutocomplete";
import groupAutocomplete from "./parts/groupAutocomplete";
import matterAutocomplete from "./parts/matterAutocomplete";
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
    "person-autocomplete": personAutocomplete,
    "group-autocomplete": groupAutocomplete,
    "matter-autocomplete": matterAutocomplete,
    "domain-select": domainSelect
  },
  computed: {
    headers() {
      return [
        { text: "id", sortable: false, value: "id" },
        { text: "ref_id", sortable: false, value: "ref_id" },
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
    },
    updateRefId(ref_id) {
      window.axios
        .post(`sources/ref_id/${this.source_id}/update`, {'ref_id': ref_id})
        .then()
        .catch();
    }
  }
};
</script>

<style>
.v-card__title {
  font-size: 1.1rem;
  line-height: 1.5rem;
  padding: 12px;
  padding-bottom: 0;
  text-align: center;
}
</style>