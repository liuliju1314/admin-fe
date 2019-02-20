import Vue from "vue";
import Router from "vue-router";
const LayOut = () => import("@/views/layout/LayOut");
Vue.use(Router);
const routes = [
    { path: "", component: () => import("@/views/redirect/Index") },
    { path: "/login", component: () => import("@/views/login/LogIn") },
    {
        path: "/home",
        component: LayOut,
        redirect: "/home/index",
        name: "home",
        meta: { title: "home" }
    },
    {
        path: "",
        component: LayOut,
        children: [
            {
                path: "product",
                component: () => import("@/views/product/ProductList")
            },
            {
                path: "product/:id",
                component: () => import("@/views/product/info"),
                children: [
                    {
                        path: "detail",
                        component: () => import("@/views/product/info/BaseInfo")
                    },
                    {
                        path: "property",
                        component: () =>
                            import("@/views/product/info/property/PropertyList")
                    },
                    {
                        path: "fireware",
                        component: () =>
                            import("@/views/product/info/fireware/FirewareList")
                    },
                    {
                        path: "device",
                        component: () =>
                            import("@/views/product/info/device")
                    }
                ]
            }
        ]
    },
    {
        path: "/device",
        component: LayOut,
        children: [
            { path: "", component: () => import("@/views/device/DeviceList") }
        ]
    },
    {
        path: "/user",
        component: LayOut,
        children: [
            { path: "", component: () => import("@/views/user/AccountManage") }
        ]
    },
    {
        path: "/404",
        component: LayOut,
        children: [
            { path: "", component: () => import("@/views/errorPage/404") }
        ]
    },
    { path: "*", redirect: "/404" }
];

export default new Router({
    mode: "history",
    routes
});
