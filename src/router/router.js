import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import News from '../pages/News';
import About from '../pages/About';
import Agreement from '../pages/Agreement';
import OurHistory from '../pages/OurHistory';
import Contact from '../pages/Contact';
import MediaView from '../pages/MediaView';
import File from '../pages/acesso_restrito/File';
import Segment from '../pages/acesso_restrito/Segment';
import JuryAccessory from '../pages/acesso_restrito/JuryAccessory';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
        },
        {
            path: '/noticias/:id',
            component: News,
            name: 'noticias',
            props: { default: true, sidebar: false}   
        },
        {
            path: '/quem-somos',
            component: About,
            name: 'sobre'
        },
        {
            path: '/nossa-historia',
            component: OurHistory,
            name: 'historia'
        },
        {
            path: '/convênios',
            component: Agreement,
            name: 'convênio'
        },
        {
            path: '/contato',
            component: Contact,
            name: 'contato'
        },
        {
            path: '/aspol-na-midia',
            component: MediaView,
            name: 'midia'
        },
        {
            path: '/acesso-restrito/arquivos',
            component: File,
            name: 'arquivos'
        },
        {
            path: '/acesso-restrito/sugestões',
            component: Segment,
            name: 'sugestoes'
        },
        {
            path: '/acesso-restrito/assessoria-juridica',
            component: JuryAccessory,
            name: 'assessoria-juridica'
        }
    ]

})