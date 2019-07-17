import Vue from 'vue';
import toast from './toast';
Vue.prototype.$toast = {
    confirm(options = {}) {
        options.icon = 'confirm';
        toast(options);
    },
    info(options = {}) {
        options.icon = 'info';
        toast(options);
    },
    warn(options = {}) {
        options.icon = 'warn';
        toast(options);
    },
    error(options = {}) {
        options.icon = 'error';
        toast(options);
    }
}