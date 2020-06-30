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
import RestrictAccess from '../pages/acesso_restrito/RestrictAccess';
import File from '../pages/acesso_restrito/File';
import Suggestion from '../pages/acesso_restrito/Suggestion';
import JuryAccessory from '../pages/acesso_restrito/JuryAccessory';
import Transparency from '../pages/acesso_restrito/Transparency';
import FormTransparency from '../components/transparency/NewManagementForm';
import TableNews from '../components/news/TableNews';
import FormNews from '../components/news/FormNews';
import TableAbout from '../components/institucional/about/TableAbout';
import FormAbout from '../components/institucional/about/FormAbout';
import TableAgreement from '../components/agreement/TableAgreement';
import FormAgreement from '../components/agreement/FormAgreement';
import TableAssociated from '../components/associated/TableAssociated';
import FormAssociated from '../components/associated/FormAssociated';
import TableMedia from '../components/media/TableMedia';
import FormMedia from '../components/media/FormMedia';
import TableFile from '../components/file/TableFile';
import FormFile from '../components/file/FormFile';
import TableUser from '../components/user/TableUser';
import Dashboard from '../pages/acesso_restrito/Dashboard';
import Search from '../pages/Search';
import User from '../components/user/User';
import AssociatedInfo from '../components/associated/AssociatedInfo';
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
            props: { default: true, sidebar: false }

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
            path: '/associados/formulario/:id',
            component: FormAssociated,
            name: 'form-associated',
            props: { default: true, sidebar: false }
        },
        {
            path: '/acesso-restrito',
            component: RestrictAccess,
            redirect: '/acesso-restrito/arquivos',
            children: [{
                path: 'arquivos',
                component: File,
                name: 'arquivos'
            }, {
                path: 'sugestões',
                component: Suggestion,
                name: 'sugestoes'
            }, {
                path: 'assessoria-juridica',
                component: JuryAccessory,
                name: 'assessoria-juridica'
            }, {
                path: 'transparencia',
                component: Transparency,
                name: 'transparencia'
            },
            {
                path: 'transparencia/gestao/:id',
                component: FormTransparency,
                name: 'form-transparency'
            },
            {
                path: 'noticias/painel',
                component: TableNews,
                name: 'table-news'
            }, {
                path: 'noticias/formulario/:id',
                component: FormNews,
                name: 'form-news',
                props: { default: true, sidebar: false }
            },
            {
                path: 'institucional/painel',
                component: TableAbout,
                name: 'table-about'
            }, {
                path: 'institucional/formulario/:id',
                component: FormAbout,
                name: 'form-about'
            }, {
                path: 'convenios/painel',
                component: TableAgreement,
                name: 'table-agreement'
            }, {
                path: 'convenios/formulario/:id',
                component: FormAgreement,
                name: 'form-agreement',
                props: { default: true, sidebar: false }
            }, {
                path: 'associados/painel',
                component: TableAssociated,
                name: 'table-associated'
            }, {
                path: 'midias-sociais/painel',
                component: TableMedia,
                name: 'table-media'
            }, {
                path: 'midias-sociais/formulario/:id',
                component: FormMedia,
                name: 'form-media',
                props: { default: true, sidebar: false }
            }, {
                path: 'arquivos/painel',
                component: TableFile,
                name: 'table-file'
            }, {
                path: 'arquivos/formulario/:id',
                component: FormFile,
                name: 'form-file',
                props: { default: true, sidebar: false }
            }, {
                path: 'usuarios/painel',
                component: TableUser,
                name: 'table-user'
            }, {
                path: 'relatórios',
                component: Dashboard,
                name: 'dashboard'
            },]
        },
        {
            path: '/buscar/:search',
            component: Search,
            name: 'buscar',
            props: { default: true, sidebar: false }
        },
        {
            path: '/minha-conta',
            component: User,
            name: 'user'
        },
        {
            path: '/minha-conta/associado',
            component: AssociatedInfo,
            name: 'associated-info'
        },
        {
            path: '*',
            component: NotFound
        }
    ]

})