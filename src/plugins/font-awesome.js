import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
    faNewspaper,
    faBuilding,
    faPhone,
    faAddressCard,
    faHandshake,
    faUsers,
    faPrint,
    faFileCsv
    } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(fab,faNewspaper, faBuilding, faPhone, faAddressCard, faHandshake, faUsers,faPrint, faFileCsv);
Vue.component('font-awesome-icon', FontAwesomeIcon);