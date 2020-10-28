import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from '@/components/HelloWorld' // @ = src
import Page from '@/components/pages/page' //
import Child1 from '@/components/pages/child1' //
import Child2 from '@/components/pages/child2' //
import Child3 from '@/components/pages/child3' //
import Menu from '@/components/pages/menu' //

Vue.use(VueRouter);

export default new VueRouter({
    routes: [

        {
            name: '首頁',  // 元件的名稱
            path: '/',    // 元件的路徑
            component: Home,  // 元件本身

        },
        {
            path: '/page',    // 元件的路徑
            components: {
                default: Page,
                menu: Menu
            },
            children: [
                {
                    name: '卡片 1',  // 元件的名稱
                    path: '',    // 元件的路徑
                    component: Child1 // 元件本身
                },
                {
                    name: '卡片 2',  // 元件的名稱
                    path: 'child2',    // 元件的路徑
                    component: Child2 // 元件本身
                },
                {
                    name: '卡片 3',  // 元件的名稱
                    path: 'child3',    // 元件的路徑
                    component: Child3 // 元件本身
                },
            ]
        }
    ]
});
