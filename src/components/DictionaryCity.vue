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
    <v-spacer></v-spacer>

    <v-data-table 
      :headers="headers" 
      :items="datas" 
      :search="search" 
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [200,500,1000,-1]
      }"
      dense
      @click:row="showSources"
    >
    <template v-slot:item.remove="{ item }">
      <v-icon color="red" @click="remove(item)">mdi-delete</v-icon>
    </template>
    </v-data-table>

    <v-row justify="center">
      <v-dialog v-model="dialog" scrollable>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-card>
          <v-card-title><strong>{{selectedDictItem}}</strong>...<a @click="dialog = false">close</a></v-card-title>
          <v-card-subtitle><span class="dict_term">{{url}}</span></v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text style="height: 600px;">
            <v-list-item v-for="source in sources" :key="source.id">
              <v-list-item-content>
                <v-list-item-title>{{source.id}} - <strong>{{source.date}}</strong><br><span v-html="highlightItem(source.source)"></span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="red" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </v-card>
</template>

<script>
export default {
  props: ["url"],
  data: function () {
    return {
      datas: [],
      sources: [],
      search: '',
      item: '',
      dialog: false,
      selectedDictItem: '',
      rules: {
      required: value => !!value || 'Required.'
      }
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    // https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    headers() {
      return [
        { text: "Total", sortable: true, value: "sources_count" },
        { text: "Name", sortable: true, value: "name" },
        { text: 'Remove', sortable: true, value: 'remove' }
      ]
    }
  },
  methods: {
    fetchData () {
      window.axios
      .get(this.url + '/counts')
      .then(response => this.datas = response.data);
    },
    remove(item) {
      const index = this.datas.indexOf(item)
      window.axios
      .delete(this.url+ '/remove/' + item.id)
      .then(() => {
        this.datas.splice(index, 1)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getSources(id) {
      window.axios
              .get('sources/dictionaries/' + this.url + '/' + id)
              .then(response => this.sources = response.data);
    },
    showSources(item) {
      this.selectedDictItem = item.name;
      this.dialog = true;
      this.sources = this.getSources(item.id);
    },
    highlightItem(source) {
      const regex = RegExp('(\\b'+ this.selectedDictItem +'[s]?\\b)', "igm");
      source = source.replace(regex, match => {
        return (
                '<span style="background-color: #FFFF00">' + match + '</span>'
        );
      })
      return source
    }
  }
}
</script>

<style>

tr:hover {
  cursor: pointer;
}
.dict_term {
  text-transform: capitalize;
}

</style>