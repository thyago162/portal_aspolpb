import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        loading: false
    },

    getters: {
        getToken: state => {
            return state.token;
        },
        
        getLoading: state => {
            return state.loading;
        },
    },
    actions: {
        saveToken({commit}, token) {
            commit('setToken',token);
        },
        loading({commit},load) {
            commit('setLoad',load)
        }   
    },
    mutations: {
        setToken(state,payload) {
            state.token = payload;
        },
        setLoad(state,payload) {
            state.loading = payload
        }
    }
})


