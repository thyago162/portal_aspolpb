import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import News from '../pages/News';
import About from '../pages/About';
import Agreement from '../pages/Agreement';
import OurHistory from '../pages/OurHistory';
import Contact from '../pages/Contact';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
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
        }

    ]
})