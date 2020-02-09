import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import Institucional from '../pages/Institucional';

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

    ]
})