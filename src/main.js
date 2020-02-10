import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './vuex/store';

import './library/library';

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')