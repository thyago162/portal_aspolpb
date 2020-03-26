import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-18-229-134-125.sa-east-1.compute.amazonaws.com/api/'
export default Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }

});
