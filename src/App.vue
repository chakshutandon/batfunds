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
