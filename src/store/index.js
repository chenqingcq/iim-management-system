import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import userInfo from './modules/userInfo';
import personnelList from './modules/personnelList';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    modules: {
        userInfo,
        personnelList
    },
    plugins: [createPersistedState()]
})