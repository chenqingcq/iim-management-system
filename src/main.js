// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import md5 from 'js-md5';
import VueClipboard from 'vue-clipboard2';
import App from './App';
import router from './router';
import store from '@/store';
import ebus from '@/utils/ebus';
import i18n from '@/common/lang';
import '@/common/toast';

import 'lib-flexible/flexible.js';
import 'iview/dist/styles/iview.css';


Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.prototype.$ebus = ebus;

Vue.use(VueClipboard);
window.BASE_IMG_URL = process.env.BASE_IMG_URL;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    components: { App },
    template: '<App/>'
})