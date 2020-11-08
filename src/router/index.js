import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [

        {
            path: '*',
            redirect: '/login'

        },
        {
            name: 'Login',  // 元件的名稱
            path: '/login',    // 元件的路徑
            component: Login,  // 元件本身
        },
        {
            name: '儀表板',  // 元件的名稱
            path: '/admin',    // 元件的路徑
            component: Dashboard,  // 元件本身
            children: [
                {
                    name: '產品頁',  // 元件的名稱
                    path: 'products',    // 元件的路徑
                    component: Products,  // 元件本身
                    meta: {
                        requiresAuth: true
                    }

                }
            ]

        },
    ]
});
