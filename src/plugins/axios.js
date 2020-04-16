import Vue from 'vue';
import axios from 'axios';
import { default_url } from '../config.js';

//axios.defaults.baseURL = 'http://193.46.198.137:8000/api/'
axios.defaults.baseURL = default_url
export default Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }

});