export const menus = [
    { name: "首页", icon: "home", path: "/home" },
    { 
        name: "产品管理", 
        icon: "product", 
        path: "/product",
        children: [
            { name: "产品列表", icon: "edit", path: "/product" }, 
            { name: "创建产品", icon: "create", path: "/product/create" },  
        ]
    },
    { name: "设备管理", icon: "manage", path: "/device"},
    { name: "固件管理", icon: "product", path: "/fireware" },
    { name: "账号管理", icon: "account", path: "/user" }
];

