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

    <v-row>
      <v-col cols="12" sm="4">
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-text-field
                v-model="item"
                label="Ajouter un item"
                filled
                :rules="[rules.required, rules.counter]"
              ></v-text-field>
          </v-form>
        </v-card-text>
      </v-col>
      <v-col cols="12" sm="2">
        <v-card-text>
          <v-btn
              color="success"
              class="mr-4 float-md-right"
              @click="addItem"
          >
          Valider
          </v-btn>
        </v-card-text> 
      </v-col> 
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      Item ajouté
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-data-table 
      :headers="headers" 
      :items="datas" 
      :search="search" 
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [50,100,200,-1]
      }"
      dense
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["url"],
  data: function () {
    return {
      datas: [],
      search: '',
      item: '',
      rules: {
      required: value => !!value || 'Required.'
      },
      snackbar: false,
      timeout: 2000,
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
        { text: "Total", sortable: false, value: "sources_count" },
        { text: "Name", sortable: false, value: "name" }
      ]
    }
  },
  methods: {
    fetchData () {
      window.axios
      .get(this.url + '/counts')
      .then(response => this.datas = response.data);
    },
    addItem() {  
      if(this.item || this.item.length > 0)  
        window.axios
        .post(this.url + '/add', {'item':this.item})
        .then(resp => {
          this.datas.push( { "id": resp, "name": this.item, "sources_count": 0 });
          this.item = '';
          this.snackbar = true
        })
        .catch();
    }
  }
}
</script>