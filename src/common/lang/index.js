import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import zh from './zh';
import en from './en';
import ru from './ru';
import enLocale from 'iview/dist/locale/en-US';
import zhLocale from 'iview/dist/locale/zh-CN';
import ruLocale from 'iview/dist/locale/ru-RU';
const messages = {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale),
    ru: Object.assign(ru, ruLocale)
};
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: Cookies.get('language') || 'zh', // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: messages,
    silentTranslationWarn: true
});
export default i18n;