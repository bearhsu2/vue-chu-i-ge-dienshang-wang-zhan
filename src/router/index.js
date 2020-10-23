import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from '@/components/HelloWorld' // @ = src
import Page from '@/components/pages/page' //

Vue.use(VueRouter);

export default new VueRouter ({
    routes: [

        {
            name: '首頁',  // 元件的名稱
            path: '/',    // 元件的路徑
            component: Home // 元件本身
        },
        {
            name: '分頁',  // 元件的名稱
            path: '/page',    // 元件的路徑
            component: Page // 元件本身
        }
    ]
});
