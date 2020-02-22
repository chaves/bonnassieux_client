<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
          <v-list-item link to="/">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>To validate</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item link to="/valides">
            <v-list-item-action>
              <v-icon>check_circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Validated</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Bonnassieux</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row>
          <v-col>

            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text"></span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  methods: {

    getCities: function(city) {
      window.axios
        .get('cities/search/' + city)
        .then(response => {
          console.log(response.data)
          this.cities = response.data;
          });
    }
  },

  data: () => ({
    drawer: null,
    cities: [],
    selected_cities: [],
    selected_city: null,
  }),
};
</script>