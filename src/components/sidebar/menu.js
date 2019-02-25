export const menus = [
    { name: "首页", icon: "home", path: "/home" },
    { name: "产品管理", icon: "product", path: "/product" },
    { name: "设备管理", icon: "manage", path: "/device" },
    { name: "规则引擎", icon: "rule", path: "/rule" },
    { name: "账号管理", icon: "account", path: "/user" },
    { name: "监控运维", icon: "monitor", path: "/monitor", children:[
        { name: "日志服务", icon: "log", path: "/log" },
        { name: "在线调试", icon: "test", path: "/test" }
    ]}
];
