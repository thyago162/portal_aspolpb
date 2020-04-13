import Vue from 'vue';
import axios from 'axios';

//axios.defaults.baseURL = 'http://193.46.198.137:8000/api/'
axios.defaults.baseURL = 'http://localhost:8000/api/'
export default Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }

});
