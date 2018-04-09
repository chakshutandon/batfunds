<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        v-model="drawer">
        <navigation></navigation>
      </v-navigation-drawer>  
      <v-toolbar
        app
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        fixed>
          <v-btn @click="drawer = !drawer" flat icon color="indigo">
            <v-icon>menu</v-icon>
          </v-btn>
          <h1 class="title">Batfunds</h1>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">

          <v-menu bottom offset-y>
            <v-btn flat slot="activator">
              <v-icon>person</v-icon>
            </v-btn>
            <v-list>
            <v-list-tile>
            <v-list-tile-content>
            <v-btn flat href="/logout">
              <v-list-tile-title>Logout</v-list-tile-title>
              </v-btn>
              </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>

          </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import navigation from '@/components/Navigation';

export default {
  name: 'App',
  data() {
    return {
      drawer: null,
    };
  },
  components: {
    navigation,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
