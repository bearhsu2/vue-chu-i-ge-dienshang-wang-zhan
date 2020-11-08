import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';
import 'bootstrap'

import App from '@/App' // ".vue" can be ignored
import router from '@/router';


Vue.use(VueAxios, axios); //啟用套件
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');

router.beforeEach((to, from, next) => {
        if (to.meta.requiresAuth) {
            axios.post('https://vue-course-api.hexschool.io/api/user/check').then((response) => {
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
