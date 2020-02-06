import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/'
export default Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
});
