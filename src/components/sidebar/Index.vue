<template>
    <el-menu 
        :default-active="$route.path" 
        class="el-menu-vertical-demo" 
        background-color="#002140" 
        text-color="#fff" 
        active-text-color="#ffd04b" 
        :collapse="isCollapse"
        router
    >
        <template v-for=" (menu,index) in menuList ">
            <menu-item class="menu-item-box" :menu="menu" :key="index"></menu-item>
        </template>
    </el-menu>
</template>

<script>
import { menus } from "./menu";
import MenuItem from './MenuItem';
export default {
    name: "SideBar",
    props: ['isCollapse'],
    data() {
        return {
            menuList: menus
        };
    },
    components: {
        MenuItem
    }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>
<style lang="less" scoped>
</style>
