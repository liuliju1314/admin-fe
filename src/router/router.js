import Vue from "vue";
import Router from "vue-router";
const LayOut = () => import("@/views/layout/LayOut");
Vue.use(Router);
export const routes = [
    { path: "", component: () => import("@/views/redirect/Index") },
    { path: "/login", component: () => import("@/views/login/LogIn") },
    {
        path: "/home/index",
        component: LayOut,
        children: [
            { path: "", name:"home", component: () => import("@/views/home/Home"), meta: { title: '首页' } }
        ]
    },
    {
        path: "",
        component: LayOut,
        children: [
            {
                path: "product",
                name: "ProductList",
                component: () => import("@/views/product/ProductList"),
                meta: { title: '产品管理' }
            },
            {
                path: "product/:id",
                component: () => import("@/views/product/info"),
                children: [
                    {
                        path: "detail",
                        component: () => import("@/views/product/info/BaseInfo"),
                    },
                    {
                        path: "property",
                        component: () =>
                            import("@/views/product/info/property/PropertyList"),
                    },
                    {
                        path: "firmware",
                        component: () =>
                            import("@/views/product/info/firmware/FirmwareList"),
                    },
                    {
                        path: "device",
                        component: () =>
                            import("@/views/product/device/DeviceList")
                    },
                    {
                        path: "analyse",
                        component: () => import("@/views/product/info/dataAnalyse/DataAnalyse")
                    }
                ]
            }
        ]
    },
    {
        path: "",
        component: LayOut,
        children: [
            {
                path: "product/:id/device/:did",
                component: () => import("@/views/product/device/info"),
                children: [
                    {
                        path: "detail",
                        component: () => import("@/views/product/device/info/BaseInfo")
                    },
                    {
                        path: "state",
                        component: () =>
                            import("@/views/product/device/info/OperateState")
                    }
                ]
            }
        ]
    },
    {
        path: "",
        component: LayOut,
        children: [
            {
                path: "rule",
                name: "RuleEngine",
                component: () => import("@/views/rule/RuleEngine"),
                meta: { title: '规则引擎' }
            },
            {
                path: "rule/:id",
                component: () => import("@/views/rule/info"),
                children: [
                    {
                        path: "detail",
                        component: () => import("@/views/rule/info/BaseInfo")
                    },
                    {
                        path: "linkage",
                        component: () => import("@/views/rule/info/SceneLinkage")
                    }
                ]
            }
        ]
    },
    {
        path: "/user",
        component: LayOut,
        children: [
            { path: "", name: "AccountManage", component: () => import("@/views/user/AccountManage"), meta: { title: '管理员列表' } }
        ]
    },
    {
        path: "/monitor",
        component: LayOut,

        children: [
            {
                path: "/log",
                name: "Log", component: () => import("@/views/monitor/Log"), meta: { title: '日志服务' }
            },
            { path: "/debug", name: "Debug", component: () => import("@/views/monitor/Debug"), meta: { title: '设备调试' } }

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
