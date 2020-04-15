import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faFacebookSquare,
    faFacebook,
    faInstagramSquare,
    faInstagram,
    faWhatsappSquare, 
    faWhatsapp,
    faTwitterSquare,
    faTwitter
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
    faTv,
    faGlobe,
    faFilePdf,
    faPlay,
    faHeadphones,
    faEnvelope,
    faShareAlt

    } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(
    faFacebookSquare,
    faFacebook,
    faInstagramSquare,
    faInstagram,
    faWhatsappSquare,
    faWhatsapp,
    faTwitterSquare,
    faTwitter,
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
    faTv,
    faGlobe,
    faFilePdf,
    faPlay,
    faHeadphones,
    faEnvelope,
    faShareAlt
);

Vue.component('font-awesome-icon', FontAwesomeIcon);