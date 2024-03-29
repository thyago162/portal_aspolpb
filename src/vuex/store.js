import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
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
        warning: [],
        token: null,
        loggedIn: [],
        campaign: [],
        visualIdentity: [],
        image: null,
        cropImg: null
    },

    getters: {
        getToken: state => {
            return state.token;
        },

        getLoggedIn: state => {
            return state.loggedIn;
        },

        getNews: state => {
            return state.news;
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

        getCampaign: state => {
            return state.campaign;
        },

        getVisualIdentity: state => {
            return state.visualIdentity;
        },

        getImage: state => {
            return state.image;
        },

        getCropImage: state => {
            return state.cropImg;
        }
    },
    actions: {
        
        token({commit}, token) {
            commit('setToken', token);
        },

        loggedIn({commit}, user) {
            commit('setLoggedIn', user);
        },

        news({commit}, id) {
            if (typeof id == 'undefined') {
                id = 1
            }
            axios.get('news?page='+id)
            .then(res => {
                commit('setNews',res.data.result.news);
            })
        },

        partners({commit}) {
            axios.get('partner')
            .then(res => {
                commit('setPartners',res.data.result.partner);
            })
        },

        about({commit}, id) {
            if (typeof id == 'undefined') {
                id = 1
            }

            axios.get('about?page='+id)
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

        media({commit}, id) {
            if (typeof id == 'undefined') {
                id = 1
            }
            axios.get('media?page='+id)
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

        file({commit}, token) {
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

        users({commit}, data) {
            
            axios.get('users?page='+data.page, {
                headers: {
                    Authorization: 'Bearer '+data.token
                }
            })
            .then(res => {
                if (res.status === 200) {
                    commit('setUser', res.data.result.users)
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

        associated({commit}, data) {
            axios.get('associated?page='+data.id, {
                headers: {
                    Authorization: 'Bearer '+data.token
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
                    commit('setWarning', res.data.result.warning)
                }
            })
            
        },

        campaign({commit}) {
            axios.get('campaign')
            .then(res => {
                if (res.status === 200) {
                    commit('setCampaign', res.data.result.campaign)
                }
            })

        },

        visualIdentity({commit}) {
            axios.get('visual-identity')
            .then(res => {
                if (res.status === 200) {
                    commit('setVisualIdentity', res.data.result.visualIdentity)
                }
            })
        },

        images({commit}, param) {
            commit('setImages', param);
        },

        cropImage({commit}, param) {
            commit('setCropImage', param);

        }
    },
    mutations: {

        setToken(state, payload) {
            state.token = payload;
        },
        
        setLoggedIn(state, payload) {
            state.loggedIn = payload;
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
        },

        setUser(state, payload) {
            state.users = payload;
        },

        setCampaign(state, payload) {
            state.campaign = payload;
        },

        setVisualIdentity(state, payload) {
            state.visualIdentity = payload;
        },

        setImages(state, payload) {
            state.image = payload
        },

        setCropImage(state, payload) {
            state.cropImg = payload
        }

    }
})


