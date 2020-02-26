import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        loading: false,
        news: [],
        users: [],
        partners: [],
        about: [],
    },

    getters: {

        getToken: state => {
            return state.token;
        },

        getNews: state => {
            return state.news;
        },
        
        getLoading: state => {
            return state.loading;
        },

        getUsers: state => {
            return state.users;
        },

        getPartners: state => {
            return state.partners;
        },

        getAbout: state => {
            return state.about;
        }
    },
    actions: {

        saveToken({commit}, token) {
            commit('setToken',token);
        },

        news({commit}) {
            axios.get('news')
            .then(res => {
                commit('setNews',res.data.result.news);
            })
        },

        users({commit}, state) {
            axios.post('users', {
                Authorization: 'Bearer '+ state.token
            })
            .then(res => {
                commit('setUsers',res.data.result.users);
            })
        },

        partners({commit}) {
            axios.get('partner')
            .then(res => {
                commit('setPartners',res.data.result.partner);
            })
        },

        about({commit}) {
            axios.get('about')
            .then(res => {
                commit('setAbout',res.data.result.about);
            })
        },

        loading({commit},load) {
            commit('setLoad',load);
        }   
    },
    mutations: {

        setToken(state,payload) {
            state.token = payload;
        },

        setLoad(state,payload) {
            state.loading = payload;
        },

        setNews(state, payload) {
            state.news = payload;
        },

        setUsers(state, payload) {
            state.users = payload;
        },

        setPartners(state, payload) {
            state.partners = payload;
        },

        setAbout(state, payload) {
            state.about = payload;
        }
    }
})


