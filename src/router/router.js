import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import Institucional from '../pages/Institucional';
import News from '../pages/News';
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
            path: '/institucional',
            component: Institucional,
            name: 'institucional'
        },
        {
            path: '/noticias/:id',
            component: News,
            name: 'noticias',
            props: { default: true, sidebar: false}   
        },
        {
            path: '/contato',
            component: Contact,
            name: 'contato'
        }

    ]
})