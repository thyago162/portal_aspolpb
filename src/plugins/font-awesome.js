import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faFacebookSquare, 
    faInstagramSquare, 
    faWhatsappSquare, 
    faTwitterSquare ,
    } from '@fortawesome/free-brands-svg-icons';

import { 
    faNewspaper,
    faBuilding,
    faPhone,
    faAddressCard,
    faHandshake,
    faUsers,
    faPrint,
    faFileCsv,
    faBullhorn,
    faFile,
    faTv
    } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(
    faFacebookSquare,
    faInstagramSquare,
    faWhatsappSquare,
    faTwitterSquare,
    faNewspaper,
    faBuilding,
    faPhone,
    faAddressCard,
    faHandshake,
    faUsers,
    faPrint,
    faFileCsv,
    faBullhorn,
    faFile,
    faTv
);

Vue.component('font-awesome-icon', FontAwesomeIcon);