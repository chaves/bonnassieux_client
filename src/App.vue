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

      <v-divider></v-divider>
      <h5 class="mt-3 ml-5">Dictionaries</h5>
      <v-list dense>

        <v-list-item link to="/cities">
          <v-list-item-action>
            <v-icon>mdi-city-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cities</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/industries">
          <v-list-item-action>
            <v-icon>mdi-factory</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Industries</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/persons">
          <v-list-item-action>
            <v-icon>mdi-account-tie</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Persons</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/groups">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Groups</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/cases">
          <v-list-item-action>
            <v-icon>mdi-briefcase</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Case types</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      app
      color="#b1040e"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Bonnassieux</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
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
    data: () => ({
      drawer: null
    })
  }
</script>