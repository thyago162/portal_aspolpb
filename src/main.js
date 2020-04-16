import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './vuex/store';
import "@/assets/css/app.css";

import './library/library';
import 'cropperjs/dist/cropper.css';

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
