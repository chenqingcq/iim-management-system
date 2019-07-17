import types from '../action-types';
import { setToken, TokenKey } from '@/utils/auth';
export default {
    state: {
        userInfo: {

        },
        token: null,
        language: '',
        activeKey: '',
        menu: [],
    },
    getters: {
        getLanguage: state => state.language,
        getMenu: state => state.menu,
        getActiveKey: state => state.activeKey
    },
    mutations: {
        [types.setUserInfo](state, payload) {
            console.log(state, payload)
        },
        [types.clearToken](state) {
            setToken('');
        },
        [types.setLanguage](state, type) {
            console.log(type, state)
            state.language = type;
        },
        [types.setMenu](state, payload) {
            state.menu = [...state.menu, payload];
        },
        [types.setActiveKey](state, key) {
            state.activeKey = key;
        },
        [types.removeMenu](state, index) {
            state.menu.splice(index, 1)
        },
        [types.clear]() {
            Object.assign(state, {
                userInfo: {

                },
                token: null,
                language: '',
                activeKey: '',
                menu: [],
            })
        }
    },
    actions: {

    }
}