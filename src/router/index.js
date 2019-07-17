import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import routes from '@/common/route/route';
import { getToken } from '@/utils/auth';
Vue.use(Router)
Vue.use(iView);

const router = new Router({
    routes: [{
            path: '/',
            redirect: "/login"
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '中新智擎总后台'
            },
            component: resolve => require(['@/components/Login'], resolve)
        },
        {
            path: '/main',
            name: 'Main',
            component: resolve => require(['@/views/Main'], resolve),
            meta: {
                title: '中新智擎总后台主页'
            },
            children: [
                ...routes.map((item) => {
                    return {
                        path: item.path,
                        name: item.name,
                        meta: {
                            title: item.label
                        },
                        component: resolve => require([`@/components/${item.path}/${item.path}`], resolve),
                        children: [
                            ...item.children.map(($item) => {
                                return {
                                    path: $item.path,
                                    name: $item.name,
                                    meta: {
                                        title: $item.label
                                    },
                                    component: resolve => require([`@/components/${item.path}/${$item.path}`], resolve),
                                }
                            })
                        ]
                    }
                })
            ]
        },
        {
            path: '/*',
            name: 'NotFound',
            component: resolve => require(['@/components/NotFound'], resolve)
        },
    ]
})
const whiteList = ['/login', '/signup'] //登录白名单避免死循环

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (getToken()) {
        next();
    } else {
        if (whiteList.includes(to.path)) { // 在免登录白名单，直接进入
            next();
        } else {
            next(`/login`); // 否则全部重定向到登录页
        }

    }
});
router.afterEach(route => {
    iView.LoadingBar.finish();
});
export default router;