import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './vuex/store';
import "@/assets/css/app.css";

//Bibliotecas bootstrap

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//Plugins externos do vue
import './plugins/axios';
import './plugins/vue_bootstrap';
import './plugins/vue_session';
import './plugins/vue2editor';
import './plugins/font-awesome';
import './plugins/vue-carousel';
import './plugins/social-sharing';
import './plugins/vue-fab';

//Filtros
import './filter/vue-filter';

import 'cropperjs/dist/cropper.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
