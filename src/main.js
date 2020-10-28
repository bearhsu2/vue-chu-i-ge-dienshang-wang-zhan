import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';
import App from '@/App' // ".vue" can be ignored
import router from '@/router';


Vue.use(VueAxios, axios); //啟用套件
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
