<template>
<v-container>
    <v-layout row wrap>
      <v-flex>
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
            hide-default-footer
            disable-pagination
            show-expand
            dense
            must-sort
          >
          <template #item.source="{item}">
            <highlight-source
              :source="item.source"
              :industries="industries"
              :cities="cities"
              :regions="regions"
              :persons="persons"
              :search="search"
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
                  <region-autocomplete :source_id="item.id" :regions_source="item.regions" />
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
                        v-on:change="updateRefId(item.id, item.ref_id)"
                      ></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="3">
                  <domain-select :source_id="item.id" :domains="domains" :domains_source="item.domains" />
                </v-col>

                <v-col cols="12" md="3">
                  <person-autocomplete :source_id="item.id" :persons_source="item.persons" />
                </v-col>

                <v-col cols="12" md="3">
                  <group-autocomplete :source_id="item.id" :groups_source="item.groups" />
                </v-col>
                
              </v-row>

            </td>
          </template>

          </v-data-table>
        </v-card>
        <pagination-sources :pagination="pagination" :page="page" @newPage="page = $event"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import highlightSource from "./parts/highlightSource";
import domainsList from "./parts/domainsList";
import cityAutocomplete from "./parts/cityAutocomplete";
import regionAutocomplete from "./parts/regionAutocomplete";
import personAutocomplete from "./parts/personAutocomplete";
import groupAutocomplete from "./parts/groupAutocomplete";
// import matterAutocomplete from "./parts/matterAutocomplete";
import domainSelect from "./parts/domainSelect";
import paginationSources from "./parts/paginationSources";

export default {
  props: ["url"],
  data: () => ({
    search: '',
    sources: [],
    industries: [],
    cities: [],
    domains: [],
    regions: [],
    persons: [],
    pagination: {},
    page: 1,
    panel: []
  }),
  components: {
    "highlight-source": highlightSource,
    "domains-list": domainsList,
    "city-autocomplete": cityAutocomplete,
    "region-autocomplete": regionAutocomplete,
    "person-autocomplete": personAutocomplete,
    "group-autocomplete": groupAutocomplete,
    // "domain-autocomplete": matterAutocomplete,
    "domain-select": domainSelect,
    "pagination-sources": paginationSources
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    // https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    this.fetchSources(),
    this.fetchDicos()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchSources',
    'page': 'fetchSources'
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
    getData: function(data) {
      let pagination = {
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url
      };
      this.pagination = pagination;
      this.sources = data.data;
    },
    fetchSources: function() {
      window.axios
        .get(this.url + "?page=" + this.page)
        .then(response => this.getData(response.data));
    },
    fetchDicos: function() {
      window.axios
        .get('industries')
        .then(response => this.industries = response.data);

      window.axios
        .get('cities')
        .then(response => this.cities = response.data);

      window.axios
        .get('domains')
        .then(response => this.domains = response.data);

      window.axios
        .get('regions')
        .then(response => this.regions = response.data);
      
      window.axios
        .get('persons')
        .then(response => this.persons = response.data); 
    },
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
    updateRefId(id, ref_id) {
      window.axios
        .post(`sources/ref_id/${id}/update`, {'ref_id': ref_id})
        .then()
        .catch();
    }
  }
}

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