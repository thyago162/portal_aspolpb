import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        loading: false,
        news: []
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
    },
    actions: {

        saveToken({commit}, token) {
            commit('setToken',token);
        },

        news({commit},state) {
            this.$http('news', {
                headers: {
                    Authorization: "Bearer "+state.token
                }
            })
            .then(res => {
                commit('setNews',res.data.news)
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
        }
    }
})


