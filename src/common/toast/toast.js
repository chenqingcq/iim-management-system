import Vue from 'vue';
import Toast from './Toast.vue';
const ToastConstructor = Vue.extend(Toast);
let instance = null;
export default function(options) {
    options = Object.assign({
        icon: 'info',
        title: "",
        content: "",
        show: true,
        loading: false,
        onOk: () => {},
        onConcel: () => {},
        onOkText: "确认",
        onConcelText: '取消',
    }, options);
    instance = new ToastConstructor({
        data() {
            return {
                onConcelText: options.onConcelText,
                onOkText: options.onOkText,
                icon: options.icon,
                show: options.show,
                loading: options.loading,
                title: options.title,
                content: options.content,
                onOk: options.onOk,
                onConcel: options.onConcel
            }
        }
    });
    document.body.appendChild(instance.$mount().$el);
}