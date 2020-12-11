import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrder from "../components/pages/CustomerOrder";
import CustomerCheckout from "../components/pages/CustomerCheckout";
import Coupons from '@/components/pages/Coupons'

import {configure, extend, localize, ValidationObserver, ValidationProvider} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';


Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
    }
});

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

                },
                {
                    name: '優惠碼頁',  // 元件的名稱
                    path: 'coupons',    // 元件的路徑
                    component: Coupons,  // 元件本身
                    meta: {
                        requiresAuth: true
                    }

                }
            ]

        },
        {
            name: '客戶',  // 元件的名稱
            path: '/',    // 元件的路徑
            component: Dashboard,  // 元件本身
            children: [
                {
                    name: '客戶產品頁',  // 元件的名稱
                    path: 'customer_order',    // 元件的路徑
                    component: CustomerOrder,  // 元件本身
                }, {
                    name: '客戶結帳頁',  // 元件的名稱
                    path: 'customer_checkout/:orderId',    // 元件的路徑
                    component: CustomerCheckout,  // 元件本身
                }
            ]

        }
    ]
});
