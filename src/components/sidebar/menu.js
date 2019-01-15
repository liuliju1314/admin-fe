export const menus = [
    { name: "首页", icon: "home", path: "/home" },
    { 
        name: "产品管理", 
        icon: "product", 
        path: "/product",
        children: [
            {name: "创建产品", icon: "addgroup", path: "/product/createProduct"}, 
            {name: "产品列表", icon: "addproduct", path: "/product/productList"}, 
            {name: "属性列表", icon: "addattribute", path: "/product/addattribute"},    
        ]
    },
    { name: "设备管理", icon: "manage", path: "/device"},
    { name: "固件管理", icon: "product", path: "/fireware" },
    { name: "账号管理", icon: "account", path: "/user" }
];

