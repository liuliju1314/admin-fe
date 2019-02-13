import Vue from 'vue'
import Router from 'vue-router'
const LayOut = () => import('@/views/layout/LayOut');
Vue.use(Router)
const routes = [
    { path: '', component: () => import('@/views/redirect/Index') },
    { path: '/login', component: () => import('@/views/login/LogIn')},
    {
        path: '/home', component: LayOut, redirect: '/home/index', name: 'home', meta: { title: 'home' }, children: [
            { path: 'index', component: () => import('@/views/example/ExampleVue') }
        ]
    },   
    {
        path: '/product',
        component: LayOut,
        children: [  
            {
                path: "createProduct/:pid",
                name: "/createProduct",
                component: () => import('@/views/product/create')
            },
            {
                path: "productList",
                component: () => import('@/views/product/ProductList')
            },
            {
                path: "addattribute",
                component: () => import('@/views/product/property/PropertyList')
            },  
        ]
    },
    {
        path: '/device', component: LayOut, children: [
            { path: '', component: () => import('@/views/device/DeviceList') }
        ]
    },
    {
        path: '/fireware', component: LayOut, children: [
            { path: '', component: () => import('@/views/fireware/FirewareList') }
        ]
    },
    {
        path: '/user', component: LayOut, children: [
            { path: '', component: () => import('@/views/user/AccountManage') }
        ]

    },
    {
        path: '/404', component: LayOut, children: [
            { path: '', component: () => import('@/views/errorPage/404') }
        ]

    },
    { path: '*', redirect: '/404' }
]


export default new Router({
    mode: 'history',
    routes
})
