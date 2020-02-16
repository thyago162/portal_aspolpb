import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper, faBuilding, faPhone, faAddressCard, faHandshake, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fab);
library.add(faNewspaper, faBuilding, faPhone, faAddressCard, faHandshake, faUsers);
Vue.component('font-awesome-icon', FontAwesomeIcon);