export const menus = [
    { name: "首页", icon: "home", path: "/home" },
    { 
        name: "产品", 
        icon: "product", 
        path: "/product",
        children: [
            { name: "开发中的产品", icon: "edit", path: "/product/developing" }, 
            { name: "已发布的产品", icon: "release", path: "/product/release" },  
            { name: "创建产品", icon: "create", path: "/product/create" },  
        ]
    },
    { name: "设备管理", icon: "manage", path: "/device"},
    { name: "固件管理", icon: "product", path: "/fireware" },
    { name: "账号管理", icon: "account", path: "/user" }
];

