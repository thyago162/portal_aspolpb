import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        news: [],
        users: [],
        partners: [],
        about: [],
        socialNetwork: [],
        media: [],
        ourHistory: [],
        agreement: [],
        file: [],
        juryAccessory: [],
        associated: [],
        transparency: [],
        warning: []
    },

    getters: {

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
        },

        getSocialNetwork: state => {
            return state.socialNetwork;
        },

        getMedia: state => {
            return state.media;
        },

        getOurHistory: state => {
            return state.ourHistory;
        },

        getAgreement: state => {
            return state.agreement;
        },

        getFile: state => {
            return state.file;
        },

        getJuryAccessory: state => {
            return state.juryAccessory;
        },

        getAssociated: state => {
            return state.associated;
        },

        getTransparency: state => {
            return state.transparency;
        },

        getWarning: state => {
            return state.warning;
        },
    },
    actions: {

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

        socialNetwork({commit}) {
            axios.get('social-network')
            .then(res => {
                commit('setSocialNetwork',res.data.result.socialNetwork);
            })
        },

        media({commit}) {
            axios.get('media')
            .then(res => {
                commit('setMedia', res.data.result.media);
            })
        },

        ourHistory({commit}) {
            axios.get('our-history')
            .then(res => {
                if (res.status === 200) {
                    commit('setOurHistory', res.data.result.ourHistory[0])
                }
            })
        },

        logout(token) {
            axios.post('logout', {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                if (res.status === 200) {
                    res
                }
            })
        },

        agreement({commit}) {
            axios.get('agreement')
            .then(res => {
                if (res.status === 200) {
                    commit('setAgreement',res.data.result.agreement)
                }
            })
        },

        file({commit},token) {
            axios.get('file', {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                if (res.status === 200) {
                    commit('setFile', res.data.result.file)
                }
            })
        },

        juryAccessory({commit}, token) {
            axios.get('jury-accessory', {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                if (res.status === 200) {
                    commit('setJuryAccessory',res.data.result.juryAccessory);
                }
            })
        },

        associated({commit},token) {
            axios.get('associated', {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                if (res.status === 200) {
                    commit('setAssociated', res.data.result.associated);
                }
            })

        },

        transparency({commit}, token) {
            axios.get('transparency', {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                if (res.status === 200) {
                    commit('setTransparency',res.data.result.transparency)
                }
            })
            
        },

        warning({commit}) {
            axios.get('warning')
            .then(res => {
                if (res.status === 200) {
                    commit('setWarning', res.data.result.warning[0])
                }
            })
            
        },

        loading({commit},load) {
            commit('setLoad',load);
        },
        
    },
    mutations: {

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
        },

        setSocialNetwork(state, payload) {
            state.socialNetwork = payload;
        },

        setMedia(state, payload) {
            state.media = payload;
        },

        setOurHistory(state, payload) {
            state.ourHistory = payload;
        },

        setAgreement(state, payload) {
            state.agreement = payload;
        },

        setFile(state, payload) {
            state.file = payload;
        },

        setJuryAccessory(state, payload) {
            state.juryAccessory = payload;
        },

        setAssociated(state, payload) {
            state.associated = payload;
        },

        setTransparency(state, payload) {
            state.transparency = payload;
        },

        setWarning(state, payload) {
            state.warning = payload;
        }

    }
})


