<template>
    <el-container>
        <el-aside>
            <sidebar-nav :isCollapse="isCollapse"></sidebar-nav>
        </el-aside>
        <el-container class="main-box">
            <el-header  class="header-box">
                <header-nav @listenCollapse="handleCollapse"></header-nav>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SidebarNav from "@/components/sidebar/Index";
import HeaderNav from "@/components/header/HeaderNav";
export default {
    name: "",
    data() {
        return {
            isCollapse: false
        };
    },
    components: {
        SidebarNav,
        HeaderNav
    },
    methods: {
        handleCollapse(value) {
            this.isCollapse = value;
        }
    }
};
</script>
<style lang="less">
.el-aside {
    max-width: 200px !important;
    width: auto!important;
    text-align: left;
    &>.el-menu {
        height: 100vh;
    }
}
.el-container > .el-header {
    padding: 0;
}
.el-main {
    background-color: #f0f2f5;
}
</style>

<style lang="less" scoped>
.header-box {
    height: @menuHeight!important;
}
</style>

