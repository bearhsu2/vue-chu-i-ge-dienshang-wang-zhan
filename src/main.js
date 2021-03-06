import Vue from 'vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import VueAxios from 'vue-axios';
import 'bootstrap'

import App from '@/App' // ".vue" can be ignored
import router from '@/router';
import './bus';
import currencyFilter from './filters/currency';


Vue.use(VueAxios, axios); //啟用套件
Vue.config.productionTip = false;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');

router.beforeEach((to, from, next) => {
        if (to.meta.requiresAuth) {

            const url = `${process.env.VUE_APP_SERVER_URL}/api/user/check`;

            axios.post(url).then((response) => {
                    if (response.data.success) {
                        console.log("Auth Successfully");
                        next();
                    } else {
                        console.log("Auth failed");
                        next({path: "/login"});
                    }
                }
            );
        } else {
            console.log("Auth Skipped");
            next();
        }

    }
)
