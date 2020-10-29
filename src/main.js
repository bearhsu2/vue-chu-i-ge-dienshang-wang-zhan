import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';
import App from '@/App' // ".vue" can be ignored
import router from '@/router';


Vue.use(VueAxios, axios); //啟用套件
Vue.config.productionTip = false;

// axios.defaults.withCredentials = true;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');

router.beforeEach((to, from, next) => {

        axios.post('https://vue-course-api.hexschool.io/api/user/check').then((response) => {
            console.log("check result: ", response.data)

            if (response.data.success) {
                next();
            } else {
                next({
                        path: "/login"
                    }
                );
            }

        });

        next();
    }
)
