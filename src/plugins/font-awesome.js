import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faFacebookSquare, 
    faInstagramSquare, 
    faWhatsappSquare, 
    faTwitterSquare 
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
    faFile
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
    faFile
);

Vue.component('font-awesome-icon', FontAwesomeIcon);