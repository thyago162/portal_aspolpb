import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import News from '../pages/News';
import NewsView from '../pages/NewsView';
import About from '../pages/About';
import Agreement from '../pages/Agreement';
import OurHistory from '../pages/OurHistory';
import Campaign from '../pages/Campaign';
import VisualIdentity from '../pages/VisualIdentity';
import Contact from '../pages/Contact';
import MediaView from '../pages/MediaView';
import File from '../pages/acesso_restrito/File';
import Suggestion from '../pages/acesso_restrito/Suggestion';
import JuryAccessory from '../pages/acesso_restrito/JuryAccessory';
import Transparency from '../pages/acesso_restrito/Transparency';
import ControlPannel from '../pages/acesso_restrito/ControlPannel';
import Search from '../pages/Search';
import NotFound from '../pages/error/NotFound';


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
            path: '/noticias',
            component: News,
            name: 'noticias',
        },
        {
            path: '/noticias/:title',
            component: NewsView,
            name: 'visualizar-noticias',
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
            path: '/campanhas',
            component: Campaign,
            name: 'campanhas'
        },
        {
            path: '/identidade-visual',
            component: VisualIdentity,
            name: 'identidade-visual'
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
            name: 'midia-view'
        },
        {
            path: '/acesso-restrito/arquivos',
            component: File,
            name: 'arquivos'
        },
        {
            path: '/acesso-restrito/sugestões',
            component: Suggestion,
            name: 'sugestoes'
        },
        {
            path: '/acesso-restrito/assessoria-juridica',
            component: JuryAccessory,
            name: 'assessoria-juridica'
        },
        {
            path: '/acesso-restrito/transparencia',
            component: Transparency,
            name: 'transparencia'
        },
        {
            path: '/acesso-restrito/painel-de-controle',
            component: ControlPannel,
            name: 'cp'
        },
        {
            path: '/buscar/:search',
            component: Search,
            name: 'buscar',
            props: { default: true, sidebar: false }
        },
        {
            path: '*',
            component: NotFound
        }
    ]

})