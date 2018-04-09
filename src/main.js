// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import {store} from './store/store'

import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>',
});
