import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        loading: false,
        news: [],
        users: []
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
        }
    },
    actions: {

        saveToken({commit}, token) {
            commit('setToken',token);
        },

        news({commit}) {
            axios.get('news')
            .then(res => {
                commit('setNews',res.data.result.news.data);
            })
        },

        users({commit}, state) {
            axios.get('users', {
                Authorization: 'Bearer '+ state.token
            })
            .then(res => {
                commit('setUsers',res.data.result.users);
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
        }
    }
})


