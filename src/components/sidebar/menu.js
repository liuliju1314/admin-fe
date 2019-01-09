export const menus = [
    { name: "首页", icon: "home", path: "/home" },
    { 
        name: "产品管理", 
        icon: "product", 
        path: "/product",
        children: [
            {name: "添加功能组", icon: "addgroup", path: "/product/addgroup"}, 
            {name: "添加产品", icon: "addproduct", path: "/product/addproduct"}, 
            {name: "添加属性", icon: "addattribute", path: "/product/addattribute"},    
        ]
    },
    { name: "设备管理", icon: "manage", path: "/device"},
    { name: "固件管理", icon: "product", path: "/fireware" },
    { name: "账号管理", icon: "user", path: "/user" }
];

